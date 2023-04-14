// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract RegisterCourse {
    // Variable
    string idSubject;
    uint256 public numberDays;
    uint256 public endTimeRegister;
    uint256 public endTimeCourse; 
    uint256 public price;
    address payable public owner;
    bool public stateCourse;

    mapping(string => address) students;
    mapping(string => bool) exists;

    string[] public listStudent;

    // Event
    event eventRegisterCourse(string idStudent, address student);
    event eventCancelCourse(string idStudent);
    event eventCancelCourseByOwner();
    event eventInfoStudent(string[] idStudent);

    // Modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not owner!");
        _;
    }

    modifier onlyOwnerAccount(string memory _idStudent) {
        require(
            msg.sender == students[_idStudent],
            "You are not owner account!"
        );
        _;
    }

    // Constructor
    constructor(
        string memory _idSubject,
        uint256 _numberDays,
        uint256 _endTimeRegister,
        uint256 _endTimeCourse,
        uint256 _price
    ) {
        idSubject = _idSubject;
        numberDays = _numberDays;
        endTimeRegister = block.timestamp + _endTimeRegister;
        endTimeCourse = block.timestamp + _endTimeCourse;
        price = _price;
        owner = payable(msg.sender);
        stateCourse = true;
    }

    // Function get price course
    // function getPrice() public view returns(uint256) {
    //     return price;
    // }

    // Function allow student register course
    function registerCourse(string memory _idStudent)
        public
        payable
    {
        require(msg.value == price, "Value is not valid!");
        require(exists[_idStudent] == false, "ID was register!");
        require(stateCourse == true, "Course is not exist!");
        require(block.timestamp < endTimeRegister, "Time register is end!");
        students[_idStudent] = msg.sender;
        exists[_idStudent] = true;
        listStudent.push(_idStudent);
        emit eventRegisterCourse(_idStudent, msg.sender);
    }

    // Function array student
    function getListStudent() public view returns(string[] memory)  {
        return listStudent;
    }

    // Function allow student cancel course
    function studentCancelCourse(string memory _idStudent)
        public
        payable
        onlyOwnerAccount(_idStudent)
        returns (bool)
    {
        require(exists[_idStudent] == true, "Student don't register!");
        require(block.timestamp < endTimeCourse, "Course was end!");
        exists[_idStudent] = false;

        // Delete _idStudent in listStudent
        for (uint256 i = 0; i < listStudent.length; i++) {
            if (
                keccak256(abi.encodePacked(listStudent[i])) ==
                keccak256(abi.encodePacked(_idStudent))
            ) {
                for (
                    uint256 index = i;
                    index < listStudent.length - 1;
                    index++
                ) {
                    listStudent[i] = listStudent[i + 1];
                }
                listStudent.pop();
                break;
            }
        }
        emit eventCancelCourse(_idStudent);

        return payable(students[_idStudent]).send(price);
    }

    // Function allow mentor cencel course
    function mentorCancelCourse() public payable onlyOwner returns (bool) {
        require(
            block.timestamp < endTimeRegister,
            "Course registration has ended!"
        );
        // Transfer student
        for (uint256 i = 0; i < listStudent.length; i++) {
            if (exists[listStudent[i]] == true) {
                payable(students[listStudent[i]]).transfer(price);
            }
        }
        stateCourse = false;
        emit eventCancelCourseByOwner();

        // Transfer mentor
        return owner.send(address(this).balance);
    }

    // Event when ended time register ==> send info member register to server
    function sendInfoStudent2Server() public {
        emit eventInfoStudent(listStudent);
    }
  
}

contract ProjectCourse {
    // Variable 
    address ownerWeb;

    string[] public idCourse;

    mapping(string => address) public addressCourse;
    // Event
    event eventAddCourse(string idSubject, address address_SmartContract, address addressOwner);

    constructor() payable{
        ownerWeb = msg.sender;
    }

    function addCourse(
        string memory _idSubject,
        uint256 _numberDays,
        uint256 _endTimeRegister,
        uint256 _endTimeCourse,
        uint256 _price
    ) payable public {
        require(msg.value == (2 * _price), "Value is not valid!");
        require(
            _endTimeRegister > 0,
            "Time register is not valid!"
        );
        require(
            _endTimeCourse > _endTimeRegister,
            "Time end course is not valid!"
        );
        RegisterCourse course = new RegisterCourse(_idSubject, _numberDays, _endTimeRegister, _endTimeCourse, _price);
        idCourse.push(_idSubject);
        addressCourse[_idSubject] = address(course);
        emit eventAddCourse(_idSubject, addressCourse[_idSubject], msg.sender);
    }
    // function
}

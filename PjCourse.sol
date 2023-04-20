// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract RegisterCourse {
    // Variable

    address ownerWeb;

    struct student {
        string idStudent;
        address wallet;
    }

    struct course {
        string idSubject;
        uint256 numberDays;
        uint256 endTimeRegister;
        uint256 endTimeCourse; 
        uint256 price;
        address owner;
        bool stateCourse;
    }
    uint256 numCourses; 

    mapping(string => course) public courses;
    mapping (string => student[]) public listStudent;
    mapping (string => uint256) public numStudents;

    // Event
    event eventListStudent(string idSubject, student[] listStudent);
    event eventStudentRegisterCourse(string idSubject, string idStudent, address wallet);
    event eventStudentCancelCourse(string idSubject, string idStudent, address wallet);
    event eventMentorCancelCourse(string idSubject, address owner);

    // Constructor
    constructor(
        address _ownerWeb
    ) {
        ownerWeb = _ownerWeb;
        numCourses = 0;
    }

    // Function allow mentor create course
    function createCourse(
        string memory _idSubject, 
        uint256 _numberDays,
        uint256 _endTimeRegister,
        uint256 _endTimeCourse,
        uint256 _price
        ) public payable returns(bool) {
            require(msg.value == _price, "Value is not valid!");
            require(block.timestamp < _endTimeRegister, "Time end register is not right!");
            require(_endTimeRegister < _endTimeCourse, "Time is not right!");
            
            course storage currentCourse = courses[_idSubject];

            currentCourse.idSubject = _idSubject;
            currentCourse.numberDays = _numberDays;
            currentCourse.endTimeRegister = _endTimeRegister;
            currentCourse.endTimeCourse = _endTimeCourse;
            currentCourse.price = _price;
            currentCourse.owner = msg.sender;
            currentCourse.stateCourse = true;
            
            numCourses ++;
            numStudents[_idSubject] = 0;
            return true;
    }

    // Function allow student register course
    function studentRegisterCourse(string memory _idStudent, string memory _idSubject)
        public
        payable
        returns(bool)
    {
        require(msg.value == courses[_idSubject].price, "Value is not valid!");
        // require(listStudent[_idSubject] == false, "ID was register!");
        // require(stateCourse == true, "Course is not exist!");
        require(block.timestamp < courses[_idSubject].endTimeRegister, "Time register is end!");
        student storage currentStudent = listStudent[_idSubject].push();
        currentStudent.idStudent = _idStudent;
        currentStudent.wallet = msg.sender;

        numStudents[_idSubject] ++;
        emit eventStudentRegisterCourse(_idSubject, _idStudent, msg.sender);
        return true;
    }

    // Function array student
    function getListStudent(string memory _idSubject) public returns(student[] memory)  {
        emit eventListStudent(_idSubject, listStudent[_idSubject]);
        return listStudent[_idSubject];
    }

    // Function allow student cancel course
    function studentCancelRegisterCourse( string memory _idSubject)
        public
        payable
        returns (bool)
    {
        require(block.timestamp < courses[_idSubject].endTimeCourse, "Course was ended!");
        require(block.timestamp < courses[_idSubject].endTimeRegister, "Course was started!");
        for(uint256 i = 0; i < numStudents[_idSubject]; i++){
            if (msg.sender == listStudent[_idSubject][i].wallet){
                payable (listStudent[_idSubject][i].wallet).transfer(courses[_idSubject].price);
                emit eventStudentCancelCourse(_idSubject, listStudent[_idSubject][i].idStudent, msg.sender);
                delete listStudent[_idSubject][i];
                return true;
            }
        }
        require(1 == 0, "Not cancel!");
        return false;
    }

    // Function allow mentor cencel course
    function mentorCancelCourse(string memory _idSubject) public payable returns (bool) {
        require(block.timestamp < courses[_idSubject].endTimeRegister, "Time register was ended!");
        require(msg.sender == courses[_idSubject].owner, "You are not course owner!");
        for (uint256 i = 0; i < numStudents[_idSubject]; i++){
            if (keccak256(abi.encodePacked(listStudent[_idSubject][i].idStudent)) !=
                keccak256(abi.encodePacked(""))){
                payable (listStudent[_idSubject][i].wallet).transfer(courses[_idSubject].price);
            }
        }
        uint256 commision = courses[_idSubject].price / 20;
        payable (courses[_idSubject].owner).transfer(courses[_idSubject].price - commision);
        numCourses --;
        emit eventMentorCancelCourse(_idSubject, courses[_idSubject].owner);
        delete courses[_idSubject];
        return true;
    }

    function withdrawMentor(string memory _idSubject, uint256[] memory numdayStudys, uint256 lenS) public payable returns(bool){
        require(block.timestamp > courses[_idSubject].endTimeCourse, "Time is not over!");
        require(msg.sender != courses[_idSubject].owner, "You is not mentor!");
        uint256 totalPay = courses[_idSubject].price;
        for (uint256 i = 0; i < lenS; i++)
        {
            totalPay += (courses[_idSubject].price * (courses[_idSubject].numberDays - numdayStudys[i])) / courses[_idSubject].numberDays;
        }
        totalPay = (totalPay * 19) / 20; 
        return true;
    }

    function withdrawStudent(string memory _idSubject, uint256 numdayStudy) public payable returns(bool){
        require(block.timestamp > courses[_idSubject].endTimeCourse, "Time is not over!");
        require(numdayStudy <= courses[_idSubject].numberDays, "Number day is not valid!");
        for (uint256 i = 0; i < numStudents[_idSubject]; i++){
            if (msg.sender != listStudent[_idSubject][i].wallet){
                uint256 pays = (courses[_idSubject].price * numdayStudy) / courses[_idSubject].numberDays;
                payable (listStudent[_idSubject][i].wallet).transfer(courses[_idSubject].price - pays);
                delete listStudent[_idSubject][i];
                return true;
            }
        }   
        require(1 == 0, "You is not student or you was canceled!");
        return false;
    }
}
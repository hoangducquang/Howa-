$(document).ready(() => {
    const ABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_ownerWeb",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "idSubject",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "eventCreateCourse",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "idSubject",
                    "type": "string"
                },
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "idStudent",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "wallet",
                            "type": "address"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct RegisterCourse.student[]",
                    "name": "listStudent",
                    "type": "tuple[]"
                }
            ],
            "name": "eventListStudent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "idSubject",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "eventMentorCancelCourse",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "idSubject",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "idStudent",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "wallet",
                    "type": "address"
                }
            ],
            "name": "eventStudentCancelCourse",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "idSubject",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "idStudent",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "wallet",
                    "type": "address"
                }
            ],
            "name": "eventStudentRegisterCourse",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "courses",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "idSubject",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "numberDays",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "endTimeRegister",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "endTimeCourse",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "stateCourse",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_idSubject",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_numberDays",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_endTimeRegister",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_endTimeCourse",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "createCourse",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_idSubject",
                    "type": "string"
                }
            ],
            "name": "getListStudent",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "idStudent",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "wallet",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct RegisterCourse.student[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "listStudent",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "idStudent",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "wallet",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_idSubject",
                    "type": "string"
                }
            ],
            "name": "mentorCancelCourse",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "numStudents",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_idSubject",
                    "type": "string"
                }
            ],
            "name": "studentCancelRegisterCourse",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_idStudent",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_idSubject",
                    "type": "string"
                }
            ],
            "name": "studentRegisterCourse",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_idSubject",
                    "type": "string"
                },
                {
                    "internalType": "uint256[]",
                    "name": "numdayStudys",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256",
                    "name": "lenS",
                    "type": "uint256"
                }
            ],
            "name": "withdrawMentor",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_idSubject",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "numdayStudy",
                    "type": "uint256"
                }
            ],
            "name": "withdrawStudent",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        }
    ];

    const addressSC = "0x8DCbE94879a37A47F6426C2e91054ddf1784b082";


    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();

    // Create contract for Metamask
    var contractMM = new web3.eth.Contract(ABI, addressSC);
    console.log(contractMM);

    // Create contract for Infura
    var provider = new Web3.providers.WebsocketProvider("wss://goerli.infura.io/ws/v3/0c318738860048e1973e16489dd40040");
    var web3_infura = new Web3(provider);
    var contractInfura = new web3_infura.eth.Contract(ABI, addressSC);
    console.log(contractInfura);

    // Start listen Infura
    contractInfura.events.eventCreateCourse({
        filter: {},
        fromBlock: "latest"
    }, (err, returnEvent) => {
        if (err) {
            console.log(err);
        } else {
            console.log(returnEvent);
            $("#listTB").append(`
                <tr id="dong1">
                    <td>`+ returnEvent.returnValues[1] + `</td>
                    <td>`+ returnEvent.returnValues[0] + `</td>
                </tr>
            `)
        }
        // returnEvent.returnValues.address_SmartContract
    });
    contractInfura.events.eventStudentRegisterCourse({
        filter: {},
        fromBlock: "latest"
    }, (err, returnEvent) => {
        if (err) {
            console.log(err);
        } else {
            console.log(returnEvent);
            $("#listTB").append(`
                <tr id="dong1">
                    <td>`+ returnEvent.returnValues[1] + `</td>
                    <td>`+ returnEvent.returnValues[0] + `</td>
                    <td>`+ returnEvent.returnValues[2] + `</td>
                </tr>
            `)
        }
    });
    contractInfura.events.eventListStudent({
        filter: {},
        // fromBlock:"latest"
    }, (err, returnEvent) => {
        if (err) {
            console.log(err);
        } else {
            console.log(returnEvent);
        }
    });

    // contractInfura.events.eventRegisterCourse({filter:{}, fromBlock : "latest"}, function(err, eventReturn){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(eventReturn);
    //     }
    // });

    // Var account
    var currentAccount = "";
    var price = 0;
    var timeRegister = 0, timeCourse = 0;

    // Check metamask install
    checkMM();

    $("#btnConnectMM").click(() => {
        connectMM().then((data) => {
            currentAccount = data[0];
            console.log(currentAccount);
            document.getElementById("successConnectMM").innerHTML = "Connect successfully with address " + currentAccount.replace(currentAccount.substring(4,38), "***") + "!";
            document.getElementById("btnConnectMM").disabled = true;
        }).catch((err) => {
            document.getElementById("successConnectMM").innerHTML = err;
            console.log(err);
        })
    })


    $("#btn-create").click(() => {
        if (currentAccount.length == 0) {
            alert("Please login metamask!");
        }
        else {
            $.post("./courses", {
                categories_id: $("#create-category").val(),
                description: $("#create-description").val(),
                lectures_id: $("#create-lecturer").val(),
                name: $("#create-course-name").val(),
                price: $("#create-tuition-fee").val(),
                num_days: $("#create-days-of-course").val(),
                end_date: $("#create-time-end").val(),
                start_date: $("#create-time-start").val(),
                end_regist: $("#create-time-register").val(),
                create_at: Date.now(),
                delete_at: Date,
                update_at: Date.now(),
                image: "https://rightclickit.com.au/wp-content/uploads/2018/09/Image-Coming-Soon-ECC.png",
                users_id: "6437b0c684ab3117410be702",
            }, async (data) => {
                if (data.result == 1) {
                    let endTimeRegister = new Date(data.err.end_regist).getTime() / 1000
                    let endTimeCourse = new Date(data.err.end_date).getTime() / 1000
                    
                    // Call smart contract create course 
                    contractMM.methods.createCourse(data.err._id, data.err.num_days, endTimeRegister, endTimeCourse, data.err.price).send({
                        from: currentAccount,
                        value: data.err.price,
                    })
                    // .on('receipt', function(receipt){
                    //     console.log(receipt.events.eventAddCourse.returnValues.address_SmartContract);
                    // })
                    // .on('error', function(error, receipt) {
                    //     console.log(error);
                    // });

                    // var _idSubjectCurrent = data.err.id

                    // data storage
                    localStorage.setItem("_idSubjectCurrent", data.err._id);
                    localStorage.setItem("_priceCurrent", data.err.price);
                    // setTimeout(() => {
                    //     window.location.href = "/courses/detail/" + data.err._id
                    // },30000)
                }
            });

        }
    });

    $("#btnGetListStudent").click(() => {
        if (currentAccount.length == 0) {
            alert("Please login metamask!");
        }
        else {
            if (_idSubjectCurrent != '') {
                contractMM.methods.getListStudent(_idSubjectCurrent).send({
                    from: currentAccount,
                })
            }
        }
    });
    $('#btnBuyNow').click(() => {

        if (currentAccount.length == 0) {
            alert("Please login metamask!");
        } else {
            console.log("here")
            let idStudentCurrent = "6437b0c684ab3117410be702"
            let _idSubjectCurrent = localStorage.getItem("_idSubjectCurrent")
            console.log(_idSubjectCurrent)
            if (_idSubjectCurrent != '' && idStudentCurrent != '') {
                contractMM.methods.studentRegisterCourse(idStudentCurrent, _idSubjectCurrent).send({
                    from: currentAccount,
                    value: localStorage.getItem("_priceCurrent"),
                })
            }
        }
    });

});

async function connectMM() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

function checkMM() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    } else {
        console.log("You not install metamask!");
    }
}


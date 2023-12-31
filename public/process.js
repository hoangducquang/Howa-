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
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "name": "eventBalanceCourse",
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
                    "name": "addressReceiver",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "totalPay",
                    "type": "uint256"
                }
            ],
            "name": "eventWeb",
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
                    "name": "addressReceiver",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "totalPay",
                    "type": "uint256"
                }
            ],
            "name": "eventWithdrawMentor",
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
                    "name": "addressReceiver",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "totalPay",
                    "type": "uint256"
                }
            ],
            "name": "eventWithdrawStudent",
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
                },
                {
                    "internalType": "uint256",
                    "name": "balance",
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
            "name": "getBalanceCourse",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
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
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_idSubject",
                    "type": "string"
                }
            ],
            "name": "withdrawWeb",
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

    const addressSC = "0x9AFe10b99eF5e0Bd348f0dE6F6896F82f61CC734";


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
            window.location.href = "/courses/index.html"
        }
        // returnEvent.returnValues.address_SmartContract
    });
    
    contractInfura.events.eventStudentCancelCourse({
        filter: {},
        fromBlock: "latest"
    }, (err, returnEvent) => {
        if (err) {
            console.log(err);
        } else {
            console.log(returnEvent);
            document.getElementById('btnBuyNow').style.display = 'block'
            document.getElementById('btnCancelCourse').style.display = 'none'
            // window.location.href = "/courses/index.html"
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
            document.getElementById('btnBuyNow').style.display = 'none'
            document.getElementById('btnCancelCourse').style.display = 'block'
            
            let idStudentCurrent = sessionStorage.getItem('ssIdUser')
            let idSubjectCurrent = sessionStorage.getItem('ssIdCourse')
            console.log(returnEvent);
            $.post("/account/order", {
                courses_id: idSubjectCurrent,
                create_at: Date.now(),
                users_id: idStudentCurrent,
            }, async (data) => {
                if(data.result == 1){
                    $('#tbList').append(`
                        <tr>
                            <td>` + returnEvent.returnValues.idStudent + `</td>
                            <td>` + returnEvent.returnValues.wallet + `</td>
                        </tr>
                    `)
                    var spinner = document.getElementById('spinner').style.display = 'none';
                    console.log("Success")
                }
                else{
                    console.log("Fail")
                }
            });
        }
    });
    contractInfura.events.eventListStudent({
        filter: {},
        // fromBlock:"latest"
    }, (err, returnEvent) => {
        if (err) {
            console.log(err);
        } else {
            const showInfo = document.getElementById('showInfo')
            showInfo.style.display = 'block'
            $('#tbList').append(`
                <tr>
                  <td>ID Student</td>
                  <td>Address</td>
                </tr>
            
            `)
            for (let i = 0; i < returnEvent.returnValues.listStudent.length; i++) {
                if(returnEvent.returnValues.listStudent[i].idStudent != '') {
                    $('#tbList').append(`
                        <tr>
                            <td>` + returnEvent.returnValues.listStudent[i].idStudent + `</td>
                            <td>` + returnEvent.returnValues.listStudent[i].wallet + `</td>
                        </tr>
                    `)
                }
            }
            console.log(returnEvent.returnValues);
        }
    });

    contractInfura.events.eventWithdrawStudent({
        filter: {},
        fromBlock: "latest"
    }, (err, returnEvent) => {
        if(err) {
            console.log(err);
        }else {
            console.log(returnEvent);
            document.getElementById('btnWithdrawStudent').style.display = 'none'

        }
        
    })

    contractInfura.events.eventWithdrawMentor({
        filter: {},
        fromBlock: "latest"
    }, async(err, returnEvent) => {
        if(err) {
            console.log(err);
        }else {
            const ssIdCourse = sessionStorage.getItem('ssIdCourse');
            const ssIdUser = sessionStorage.getItem('ssIdUser');
            console.log(returnEvent);

            document.getElementById('btnWithdrawMentor').style.display = 'none'
            try {
                const response = await fetch(`/withdraw-mentor?_id=${ssIdCourse}&users_id=${ssIdUser}`);
                const data = await response.json();
            
                if (data.result === 1) {
                  console.log(data.error);
                  // Xử lý sau khi hủy khóa học thành công
                }else {
                    console.log(data.error);
                }
              } catch (err) {
                console.log(err);
              }
        }
        
    })
    
    // contractInfura.events.eventRegisterCourse({filter:{}, fromBlock : "latest"}, function(err, eventReturn){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(eventReturn);
    //     }
    // });
    
    // Var account
    var currentAccount = "";
    
    // Check metamask install
    checkMM();
    
    $("#btnConnectMM").click(() => {
        connectMM().then((data) => {
            currentAccount = data[0];
            console.log(currentAccount);
            sessionStorage.setItem('ssCurrentAccount', currentAccount)
            document.getElementById("not-connect").style.display = "none";
            document.getElementById("list-wallet").style.display = "block";
            document.getElementById("creditcard-card__type").innerText = currentAccount.replace(currentAccount.substring(4, 38), "***");
            document.getElementById("btnConnectMM").style.display = "none";
        }).catch((err) => {
            // document.getElementById("successConnectMM").innerHTML = err;
            console.log(err);
        })
    })
    
    $("#btn-create").click(() => {
        const currentAccount = sessionStorage.getItem('ssCurrentAccount');
        var ssIdUser = sessionStorage.getItem('ssIdUser');
        if (currentAccount == null) {
            alert("Please login metamask!");
        }
        else {
            $.post("/courses/create", {
                categories_id: $("#create-category").val(),
                description: $("#create-description").val(),
                lectures_id: $("#create-lecturer").val(),
                name: $("#create-course-name").val(),
                price: $("#create-tuition-fee").val(),
                old_price: $("#create-tuition-fee").val(),
                num_days: $("#create-days-of-course").val(),
                end_date: $("#create-time-end").val(),
                start_date: $("#create-time-start").val(),
                end_regist: $("#create-time-register").val(),
                create_at: Date.now(),
                delete_at: Date.now(),
                update_at: Date.now(),
                image: $("#selected-picture").text(),
                users_id: ssIdUser,
            }, async (data) => {
                if (data.result == 1) {
                    let endTimeRegister = new Date(data.err.end_regist).getTime() / 1000
                    let endTimeCourse = new Date(data.err.end_date).getTime() / 1000
                    
                    // Call smart contract create course 
                    await contractMM.methods.createCourse(data.err._id, data.err.num_days, endTimeRegister, endTimeCourse, data.err.price).send({
                        from: currentAccount,
                        value: data.err.price,
                    }).then(() => {
                        // window.location.href = `./courses/detail/${data.err._id}`
                    })
                }
            });

        }
    });

    // $("#btnGetListStudent").click(() => {
    //     if (currentAccount.length == 0) {
    //         alert("Please login metamask!");
    //     }
    //     else {
    //         if (_idSubjectCurrent != '') {
    //             contractMM.methods.getListStudent(_idSubjectCurrent).send({
    //                 from: currentAccount,
    //             })
    //         }
    //     }
    // });
    $('#btnBuyNow').click(async() => {
        const currentAccount = sessionStorage.getItem('ssCurrentAccount')
        var idStudentCurrent = sessionStorage.getItem('ssIdUser')
        var idSubjectCurrent = sessionStorage.getItem('ssIdCourse')
        var spinner = document.getElementById('spinner').style.display = 'block';
        if (currentAccount == null) {
            alert("Please login metamask!");
        } else if(idStudentCurrent == null){
            alert("Please login account!");
        }
        else {
            // Cần lầy giá trên db
            var priceCurrent = sessionStorage.getItem('ssPriceCourse')
            console.log(currentAccount)
            console.log(idStudentCurrent)
            console.log(idSubjectCurrent)
            
            if (idSubjectCurrent != '' && idStudentCurrent != '') {
                await contractMM.methods.studentRegisterCourse(idStudentCurrent, idSubjectCurrent).send({
                    from: currentAccount,
                    value: priceCurrent,
                }).then(() => {
                    
                });
            }
        }
    });

    $('#btnCancelCourse').click(async () => {
        const currentAccount = sessionStorage.getItem('ssCurrentAccount')
        const ssIdCourse = sessionStorage.getItem('ssIdCourse');
        const ssIdUser = sessionStorage.getItem('ssIdUser');
        const ssPriceCourse = sessionStorage.getItem('ssPriceCourse')

        if (currentAccount == null) {
            alert("Please login metamask!");
        }else {
            try {
              const response = await fetch(`/check-canceled?courses_id=${ssIdCourse}&users_id=${ssIdUser}`);
              const data = await response.json();
          
              if (data.result === 1) {
                await contractMM.methods.studentCancelRegisterCourse(ssIdCourse).send({
                  from: currentAccount,
                }).then(() => {
                    
                });
          
                // Xử lý sau khi hủy khóa học thành công
              }
            } catch (err) {
              console.log(err);
            }
        }
      });
      
      $('#btnWithdrawStudent').click(async () => {
          const currentAccount = sessionStorage.getItem('ssCurrentAccount')
          const ssIdCourse = sessionStorage.getItem('ssIdCourse');
          const ssIdUser = sessionStorage.getItem('ssIdUser');
          
  
          if (currentAccount == null) {
              alert("Please login metamask!");
            }else {
                try {
                    const response = await fetch(`/check-canceled?courses_id=${ssIdCourse}&users_id=${ssIdUser}`);
                    const data = await response.json();
                    
                    if (data.result === 1) {
                        try {
                            await contractMM.methods.withdrawStudent(ssIdCourse, 7).send({
                                from: currentAccount,
                            });
                            // Xử lý khi gọi thành công
                        } catch (error) {
                            if (error.message.includes("revert")) {
                                // Xử lý khi hợp đồng gọi revert
                                console.log("Lỗi trong hợp đồng: " + error.message);
                            } else {
                                // Xử lý các lỗi khác
                                console.log("Lỗi: " + error.message);
                            }
                        }
                        
                        
                        // Xử lý sau khi hủy khóa học thành công
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });
        
        $('#btnWithdrawMentor').click(async () => {
            const currentAccount = sessionStorage.getItem('ssCurrentAccount')
            const ssIdCourse = sessionStorage.getItem('ssIdCourse');
            const ssIdUser = sessionStorage.getItem('ssIdUser');
            
            if(currentAccount == null) {
                alert("Please login metamask!");
            }else {
                try {
                    await contractMM.methods.withdrawMentor(ssIdCourse, [7], 1).send({
                        from: currentAccount,
                    });
                    // Xử lý khi gọi thành công
                } catch (error) {
                    if (error.message.includes("revert")) {
                        // Xử lý khi hợp đồng gọi revert
                        console.log("Lỗi trong hợp đồng: " + error.message);
                    } else {
                        // Xử lý các lỗi khác
                        console.log("Lỗi: " + error.message);
                    }
                }
            }
            
        })
        
        $('#btnGet').click(async () => {
            const currentAccount = sessionStorage.getItem('ssCurrentAccount')
            const ssIdCourse = sessionStorage.getItem('ssIdCourse');
            const ssIdUser = sessionStorage.getItem('ssIdUser');
            const ssPriceCourse = sessionStorage.getItem('ssPriceCourse')
            if (currentAccount == null) {
                alert("Please login metamask!");
            }else {
                const listStudent = await contractMM.methods.getListStudent(ssIdCourse).send({
                    from: currentAccount
                });
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


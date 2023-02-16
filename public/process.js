$(document).ready(() =>{
    const ABI = [
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
            "name": "addCourse",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "payable",
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
                    "name": "address_SmartContract",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "addressOwner",
                    "type": "address"
                }
            ],
            "name": "eventAddCourse",
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
            "name": "addressCourse",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "idCourse",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
 
    const addressSC = "0x498B18c1bE96dbb68c595014bb282450c9371d5d";
    

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

    contractInfura.events.eventAddCourse({
        filter:{},
        fromBlock:"latest"
    }, (err, returnEvent) => {
        if(err) {
            console.log(err);
        }else{
            console.log(returnEvent);
        }
        // returnEvent.returnValues.address_SmartContract
    });

    // contractInfura.events.eventRegisterCourse({filter:{}, fromBlock : "latest"}, function(err, eventReturn){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(eventReturn);
    //     }
    // });


    var currentAccount = "";
    var price = 0;
    var timeRegister = 0, timeCourse = 0;

    checkMM();

    $("#btnConnectMM").click(()=>{
        connectMM().then((data)=>{
            currentAccount = data[0];
            console.log(currentAccount);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // $("#btnGetPrice").click(async ()=>{
    //     contractMM.methods.getPrice().call().then((data) => {
    //         price = web3.utils.hexToNumber(data);
    //         document.getElementById('priceCourse').innerHTML = price;
    //     });
    // })
    
    // $("#btnGetTimeRegister").click(async ()=>{
    //     contractMM.methods.endTimeRegister().call().then((data) => {
    //         timeRegister = web3.utils.hexToNumber(data);
    //         document.getElementById('endRegister').innerHTML = timeRegister;
    //     });
    // })
    
    // $("#btnGetTimeCourse").click(async ()=>{
    //     contractMM.methods.endTimeCourse().call().then((data) => {
    //         timeCourse = web3.utils.hexToNumber(data);
    //         document.getElementById('endCourse').innerHTML = timeCourse;
    //     });
    // })
    
    // $("#btnGetInfoStudent").click(()=>{
    //     contractMM.methods.getListStudent().call().then(data => console.log(data));
    // })


    $("#btnRegister").click(()=>{
        if(currentAccount.length == 0){
            alert("Please login metamask!");
        }
        else{
            $.post("./register", {
                name:$("#txtName").val(), 
                numberDay:$("#txtNumberDay").val(), 
                endTimeRegister:$("#txtEndTimeRegister").val(),
                endTimeCourse:$("#txtEndTimeCourse").val(),
                price:$("#txtPrice").val()
            }, async(data)=>{
                if(data.result == 1){
                    contractMM.methods.addCourse(data.err._id, data.err.numberDay, data.err.endTimeRegister, data.err.endTimeCourse, data.err.price).send({
                        from: currentAccount,
                        value: data.err.price * 2,
                    })
                    // .on('receipt', function(receipt){
                    //     console.log(receipt.events.eventAddCourse.returnValues.address_SmartContract);
                    // })
                    // .on('error', function(error, receipt) {
                    //     console.log(error);
                    // });
                }
            });
        }
    });

    
});

async function connectMM(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

function checkMM(){
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }else{
        console.log("You not install metamask!");
    }
}


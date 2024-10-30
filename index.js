/*
    index.js
    30-10-2024 i4k1

    TODO: number of decimal places
*/

const ethers = require("ethers")
const { Contract } = require("ethers")

const walletJSON = require("./wallet.json")

const abi = [
 // "function transfer(address to, uint amount)",
    "function balanceOf(address) public view returns (uint)",
    "function symbol() view returns (string)",
    "function name() view returns (string)"
]

for (i = 0; i < walletJSON.networks.length; ++i) {
    if (walletJSON.networks[i].mnemonicPhrase != "") {
        const provider = new ethers.JsonRpcProvider(walletJSON.networks[i].rpcUrl) // blockchain RPC node link
        const walletMnemonic = ethers.Wallet.fromPhrase(walletJSON.networks[i].mnemonicPhrase, provider) // wallet mnemonic phrase
        const wallet = new ethers.Wallet(walletMnemonic.privateKey, provider) // wallet private key

        // get wallet balance in ether
        async function get_Balance(walletaddress) {
            const balance = await provider.getBalance(walletaddress)
            const balanceInEther = ethers.formatEther(balance) // wei to ether
            return balanceInEther
        }

        // detect network name
        async function get_Network() {
            const network = await provider.getNetwork()
            return network.name
        }

        // output balance and chain name
        async function displayBalanceAndNetwork() {
            const get1 = await get_Balance(wallet.address)
            const get2 = await get_Network()
            console.log(`balance: ${get1}\nnetwork name: ${get2}\n`)
        }

        for (c = 0; c < walletJSON.networks[i].tokens.length; ++c) {
            // output private key and wallet address
                const contract = new Contract(walletJSON.networks[i].tokens[c], abi, provider); // ERC20 token contract address
            
                // balance of token
                async function getBalanceERC20(walletaddress) {
                    const balance = await contract.balanceOf(walletaddress)
                    const balanceInEth = ethers.formatEther(balance) // wei to ether
                    return balanceInEth
                }
            
                async function getERC20Name() {
                    const erc20_name = await contract.name()
                    return erc20_name
                }
            
                async function getERC20Symbol() {
                    const erc20_symbol = await contract.symbol()
                    return erc20_symbol
                }
            
                async function displayERC20BalanceAndNameAndSymbol() { 
                    const balance = await getBalanceERC20(wallet.address) 
                    const ERC20Name = await getERC20Name() 
                    const ERC20Symbol = await getERC20Symbol() 
                    console.log(`balance of tokens: ${balance}\ntoken name: ${ERC20Name}\ntoken symbol: ${ERC20Symbol}\n`) 
                } 
                displayERC20BalanceAndNameAndSymbol()
        }

        console.log(`wallet address: ${wallet.address}\nmnemonic: ${walletJSON.networks[i].mnemonicPhrase}\nprivate key: ${walletMnemonic.privateKey}\n`)
        displayBalanceAndNetwork()
    } else {
        const provider = new ethers.JsonRpcProvider(walletJSON.networks[i].rpcUrl) // blockchain RPC node link

        // get wallet balance in ether
        async function get_Balance(walletaddress) {
            const balance = await provider.getBalance(walletaddress)
            const balanceInEther = ethers.formatEther(balance) // wei to ether
            return balanceInEther
        }

        // detect network name
        async function get_Network() {
            const network = await provider.getNetwork()
            return network.name
        }

        // output balance and chain name
        async function displayBalanceAndNetwork() {
            const get1 = await get_Balance(walletJSON.networks[i].address)
            const get2 = await get_Network()
            console.log(`balance: ${get1}\nnetwork name: ${get2}\n`)
        }

        displayBalanceAndNetwork()
        console.log(`wallet address: ${walletJSON.networks[i].address}\n`)
        for (c = 0; c < walletJSON.networks[i].tokens.length; ++c) {
            // output private key and wallet address
            const contract = new Contract(walletJSON.networks[i].tokens[c], abi, provider); // ERC20 token contract address
        
            // balance of token
            async function getBalanceERC20(walletaddress) {
                const balance = await contract.balanceOf(walletaddress)
                const balanceInEth = ethers.formatEther(balance) // wei to ether
                return balanceInEth
            }
        
            async function getERC20Name() {
                const erc20_name = await contract.name()
                return erc20_name
            }
        
            async function getERC20Symbol() {
                const erc20_symbol = await contract.symbol()
                return erc20_symbol
            }
        
            async function displayERC20BalanceAndNameAndSymbol() { 
                const balance2 = await getBalanceERC20(walletJSON.networks[i].address)
                const ERC20Name = await getERC20Name() 
                const ERC20Symbol = await getERC20Symbol() 
                console.log(`balance of tokens: ${balance2}\ntoken name: ${ERC20Name}\ntoken symbol: ${ERC20Symbol}\n`) 
            }
            displayERC20BalanceAndNameAndSymbol()
        }
    }
}

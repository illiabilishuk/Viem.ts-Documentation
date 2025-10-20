// This code serves as a custom documentation of the Viem.ts library
// This file demonstrates how to work with Viem.ts Public Clients
// Public Actions do not require any special permissions nor do they provide signing capabilities to the user
// They mainly serve as onchain getter functions

// You will find comments above every feature to ease the comprehension of the code


// Import methods from Viem.ts
import { createPublicClient, http, encodeFunctionData, parseAbi } from 'viem';

// Import variables for placeholding
import vars from '../vars.js';

// Import a desired chain from the list of Viem.ts chains
import { mainnet, sepolia } from 'viem/chains';


// Create a Public Client
const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
});


//ACTIONS


// createAccessList()
// Determines storage slots for the variables
// Helps to save gas as less computation is done
const accessList = await publicClient.createAccessList({
    account: vars.account, // Address that initializes the transaction - Optional
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
    data: vars.data, // Function selector + args - Optional
    gasPrice: vars.gasPrice, // Gas price for legacy code - Optional
    maxFeePerGas: vars.maxFeePerGas, // Max fee per gas (EIP-1559) - Optional
    maxPriorityFeePerGas: vars.maxPriorityFeePerGas, // Validator's tip - Optional
    to: vars.to, // Address to - Optional
    value: vars.value, // Amount of Wei - Optional
});

// getBalance()
// Returns the balance of an address in Wei
const getBalance = await publicClient.getBalance({
    address: `0x${vars.address}`, // Address whose balance is checked
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
});

// getTransactionCount()
// Returns the number of transactions an account has broadcast / sent
const getTransactionCount = await publicClient.getTransactionCount({
    address: `0x${vars.address}`, // Address whose balance is checked
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
});

// getBlock()
// Returns information about a block at a block number, hash or tag
const getBlock = await publicClient.getBlock({
    blockHash: vars.blockHash, // Information at a given block hash - Optional
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
    includeTransactions: vars.includeTransactions, // Whether or not to include transactions - Optional
});


// getBlockNumber()
// Returns the number of the most recent block seen
const getBlockNumber = await publicClient.getBlockNumber({
    cacheTime: vars.cacheTime, // Time (in ms) that cached block number will remain in memory - Optional
});

// getBlockTransactionCount()
//Returns the number of Transactions at a block number, hash or tag
const getBlockTransactionCount = await publicClient.getBlockTransactionCount({
    blockHash: vars.blockHash, // Information at a given block hash - Optional
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
});

// simulateBlocks()
// Simulates a set of calls on block(s) with optional block and state overrides
const simulateBlocks = await publicClient.simulateBlocks({
    blocks: [ // Describes the block we want to simulate
        {
            blockOverrides: { // Changes block's global parameters
                number: vars.number, // Changes block's number
                gasLimit: vars.gasLimit, // Changes block's gas limit - Optional
                baseFeePerGas: vars.baseFeePerGas, // Changes block's base fee per gas - Optional
            },
            calls: [ // Calls simulated in the block
                {
                    from: vars.addressFrom, // Address from
                    to: vars.addressTo, // Address to
                    value: vars.value, // Value of transaction
                    data: vars.data, // Additional calldata - Optional
                }
            ], 
            stateOverrides: [ // Temporary changes for simulation
                {
                    address: `0x${vars.address}`, // Address
                    balance: vars.balance, // Assigining a new balance
                    nonce: vars.nonce, // Assigining a new nonce - Optional
                    code: vars.code, // Changing contract's code - Optional
                    stateDiff: vars.stateDiff, // Changing contract's storage - Optional
                }
            ],
        }
    ],
    returnFullTransactions: true, // True: extended data, false: mandatory only - Optional
    traceTransfers: true, // True: tracing ETH transfers - Optional
    validation: true, // True: stricter functionality assurance, false: less checks - Optional
});

// watchBlockNumber()
// Watches and returns incoming block numbers
const watchBlockNumber = publicClient.watchBlockNumber({
    onBlockNumber: blockNumber => console.log(blockNumber), // Subscribing on the latest block
    emitMissed: true, // Whether or not to emit missed block numbers to the callback - Optional
    emitOnBegin: true, // Whether or not to emit the latest block number to the callback when the subscription opens - Optional
    poll: true, // Whether or not to use a polling mechanism to check for new block numbers instead of a WebSocket subscription - Optional
    pollingInterval: vars.pollingInterval, // Polling frequency - Optiona;
});

// watchBlocks()
// Watches and returns information for incoming blocks
const watchBlocks = publicClient.watchBlocks({
    onBlock: block => console.log(block), // The block information
    onError: error => console.log(error), // Error thrown from getting a block - Optional
    blockTag: 'safe', // Watch for new blocks on a given tag - Optional
    emitMissed: true, // Whether or not to emit missed blocks to the callback - Optional
    emitOnBegin: true, // Whether or not to emit the block to the callback when the subscription opens - Optional
    includeTransactions: true, // Whether or not to include transactions - Optional
    poll: true, // Whether or not to use a polling mechanism to check for new blocks instead of a WebSocket subscription - Optional
    pollingInterval: 10, // Polling frequency - Optional
});

// call()
// Executes a new message call immediately without submitting a transaction to the network
const call = await publicClient.call({
    factory: vars.factory, // Address of a factory contract for the call - Optional
    factoryData: encodeFunctionData({ // Encoded function data for factory contract - Optional
        abi: parseAbi(['function anyFunction()']), // Function's ABI
        functionName: vars.functionName, // Function's name
        args: [], // Additional arguments
    }),
    data: encodeFunctionData({ // Encoded function call data for the main contract 
        abi: parseAbi(['function anyFunction()']), // Function's ABI
        functionName: vars.functionName, // Function's name
    }),
    to: vars.addressTo, // Address to
    accessList: [ // List of addresses and storage keys for EIP-2930 access list - Optional
        {
            address: `0x${vars.address}`, // Address
            storageKeys: [`0x${vars.address}`] // Array of addresses
        }
    ],
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
    code: vars.code, // Override the contract code - Optional
    gas: vars.gas, // Gas limit for the call - Optional
    gasPrice: vars.gasPrice, // Gas price for legacy code - Optional
    maxFeePerGas: vars.maxFeePerGas, // Max fee per gas (EIP-1559) - Optional
    maxPriorityFeePerGas: vars.maxPriorityFeePerGas, // Validator's tip - Optional
    nonce: vars.nonce, // Assigining a new nonce - Optional
    stateOverride: vars.stateOverrides, // Overrides for account state during the call (EVM state) - Optional
    value: vars.value, // Value of transaction
});

// simulateCalls()
// Simulates a call. More universal than call()
const simulateCalls = await publicClient.simulateCalls({
    calls: [ // Calls simulated in the block
        {
            to: `0x${vars.addressTo}`, // Address to
            value: vars.value, // Value of transaction
            data: vars.data, // Additional calldata - Optional
            dataSuffix: vars.dataSuffix, // Data to append to the end of the calldata - Optional
        },
    ],
    account: vars.account, // Address that initializes the transaction - Optional
    blockNumber: vars.blockNumber, // Number of the tested block - Optional
    blockTag: vars.blockTag, // Tag of the tested block - Optional
    stateOverrides: vars.stateOverrides, // Overrides for account state during the call (EVM state) - Optional
    traceAssetChanges: true, // Asset changes tracing - Optional
    traceTransfers: true, // Token transfers tracing - Optional
    validation: true, // Contract validation - Optional
});

// getChainId()
// Returns a blockchain network identifier
const getChainId = await publicClient.getChainId();

// getEip712Domain()
// Helps prevent 'replay-attacks'
const getEip712Domain = await publicClient.getEip712Domain({
    address: `0x${vars.address}`, // Contract address
    factory: vars.factoryAddress, // Specifies the address of the factory that provided the contract - Optional
    factoryData: encodeFunctionData( // Factory data - Optional
        {
            abi: [vars.factoryAbi], // Factory ABI - Optional
            functionName: vars.functionName, // Function name in the contract - Optional
            args: [] // Additional arguments - Optional
        }
    )
});

// estimateFeesPerGas
// Returns an estimate for the fees per gas
const estimateFeesPerGas = await publicClient.estimateFeesPerGas({
    type: 'legacy', // Chain type - Optional
});

// estimateGas
// Estimates the gas necessary to complete a transaction without submitting it to the network
const estimateGas = await publicClient.estimateGas({
    account: vars.account, // The Account to estimate gas from
    data: vars.data, // Contract code or a hashed method call - Optional
    gasPrice: vars.gasPrice, // The price (in wei) to pay per gas - Optional
    maxFeePerGas: vars.maxFeePerGas, // Total fee per gas - Optional
    maxPriorityFeePerGas: vars.maxPriorityFeePerGas, // Max priority fee per gas - Optional
    to: vars.to, // Transaction recipient - Optional
    value: vars.value, // Value (in wei) sent with this transaction - Optional
    blockNumber: vars.blockNumber, // The block number to perform the gas estimate against - Optional
    blockTag: vars.blockTag, // The block tag to perform the gas estimate against - Optional
    stateOverride: [ // Contract's artificial emulation of the change of its data - Optional
        {
            address: `0x${vars.address}`, // Changed address
            balance: vars.balance, // Address's balance - Optional
            stateDiff: [ // Refreshes chosen contract's slots - Optional
                {
                    slot: `0x${vars.slot}`, // Slot to be changed
                    value: `0x${vars.value}`, // Value to be assigned
                }
            ],
        },
    ],
});

// estimateMaxPriorityFeePerGas()
// Returns an estimate for the max priority fee per gas (in wei) for a transaction to be likely included in the next block
const estimateMaxPriorityFeePerGas = await publicClient.estimateMaxPriorityFeePerGas({
    chain: sepolia, // Type of chain - Optional 
});

// getBlobBaseFee()
// Returns the current blob base fee (in wei)
const getBlobBaseFee = await publicClient.getBlobBaseFee();

// getFeeHistory()
// Returns a collection of historical gas information
const getFeeHistory = await publicClient.getFeeHistory({
    blockCount: 1, // Number of blocks in the requested range
    rewardPercentiles: [25, 75], // A monotonically increasing list of percentile values
    blockNumber: 1n, // Highest number block of the requested range - Optional
    blockTag: vars.blockTag, // Highest number block of the requested range - Optional
});

// getGasPrice()
// Returns the current price of gas (in wei)
const getGasPrice = await publicClient.getGasPrice();

// createBlockFilter()
// Creates a Filter to listen for new block hashes
const createBlockFilter = await publicClient.createBlockFilter();
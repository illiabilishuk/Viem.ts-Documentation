// This code serves as a custom documentation of the Viem.ts library
// This file demonstrates how to work with Viem.ts Public Clients
// Public Actions do not require any special permissions nor do they provide signing capabilities to the user
// They mainly serve as onchain getter functions

// You will find comments above every feature to ease the comprehension of the code


// Import methods from Viem.ts
import { createPublicClient, http, encodeFunctionData, parseAbi, parseAbiItem, toBlobs, stringToHex } from 'viem';
import { mainnetTrustedSetupPath } from 'viem/node'

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
// Creates a filter to listen for new block hashes
const createBlockFilter = await publicClient.createBlockFilter();

// createEventFilter()
// Creates a filter to listen for new events
const createEventFilter = await publicClient.createEventFilter({
    address: `0x${vars.address}`, // Filter can be scoped to an address - Optional
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'), // Filter can be scoped to an event - Optional
    args: { // A Filter can be scoped to given indexed arguments - Optional
        from: vars.addressFrom,
        to: vars.addressTo,
    },
    fromBlock: 1n, // From-block range - Optional
    toBlock: 1n, // To-block range - Optional
    strict: true, // Strict mode to only return logs that conform to the indexed & non-indexed arguments - Optional
});

// createPendingTransactionFilter()
// Creates a filter to listen for new pending transaction hashes
const createPendingTransactionFilter = await publicClient.createPendingTransactionFilter();

// getFilterChanges()
// Returns a list of logs or hashes based on a filter since the last time it was called
const filter = await publicClient.createEventFilter();
const getFilterChanges = await publicClient.getFilterChanges({ filter });

// getFilterLogs()
// Returns a list of event logs since the filter was created
const getFilterLogs = await publicClient.getFilterLogs({ filter });

// getLogs()
// Returns a list of event logs matching the provided parameters
const getLogs = await publicClient.getLogs({
    address: `0x${vars.address}`, // Logs can be scoped to an address - Optional
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256)'), // Logs can be scoped to an event - Optional
    args: { // Logs can be scoped to given indexed arguments - Optional
        from: `0x${vars.addressFrom}`, // Indexed address from - Optional
        to: `0x${vars.addressTo}`, // Indexed address to - Optional
    },
    fromBlock: 1n, // Logs can be scoped to the from-block - Optional
    toBlock: 1n, // Logs can be scoped to the to-block - Optional
    strict: true, // Strict mode to only return logs that conform to the indexed & non-indexed arguments - Optional
});

// watchEvent()
// Watches and returns emitted event logs
const watchEvent = publicClient.watchEvent({
    onLogs: logs => console.log(logs), // The new Event Logs
    address: `0x${vars.address}`, // The contract address or a list of addresses from which Logs should originate - Optional
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256)'), // The event in ABI format - Optional
    args: { // Logs can be scoped to given indexed arguments - Optional
        from: `0x${vars.addressFrom}`, // Indexed address from - Optional
        to: `0x${vars.addressTo}`, // Indexed address to - Optional
    },
    batch: false, // Whether or not to batch the Event Logs between polling intervals - Optional
    onError: error => console.log(error), // Error thrown from listening for new event logs - Optional
    poll: true, // Whether or not to use a polling mechanism to check for new logs - Optional
    pollingInterval: 1, // Polling frequency - Optional
    fromBlock: 1n, // The block number to start listening for logs from - Optional
});

// uninstallFilter()
// Destroys a filter that was created from one of the following actions:
/*  
    createBlockFilter
    createEventFilter
    createPendingTransactionFilter
*/
const uninstallFilter = await publicClient.uninstallFilter({ filter });

// getProof()
// Returns the account and storage values of the specified account including the Merkle-proof
const getProof = await publicClient.getProof({
    address: `0x${vars.address}`, // Account address
    storageKeys: [`0x${vars.keys}`], // Array of storage-keys that should be proofed and included
    blockNumber: 1n, // Proof at a given block number - Optional
    blockTag: vars.blockTag, // Proof at a given block tag - Optional
});

// verifyMessage()
// Verify that a message was signed by the provided address
const verifyMessage = await publicClient.verifyMessage({
    address: `0x${vars.address}`, // The Ethereum address that signed the original message
    message: '', // The message to be verified
    signature: `0x${vars.signature}`, // The signature that was generated by signing the message with the address's signer
});

// verifyTypedData()
// Verify that typed data was signed by the provided address
const verifyTypedData = await publicClient.verifyTypedData({
    address: `0x${vars.address}`, // The Ethereum address that signed the original message
    domain: { // The typed data domain
        name: '', // Domain's name - Optional
        version: '1', // Domain's version - Optional
        chainId: 1, // Domain's chain ID - Optional
        verifyingContract: `0x${vars.verifyingContract}`, // Domain's verified contract - Optional
      },
    types: { // The type definitions for the typed data
        Person: [ // Typed data type
          { name: 'name', type: 'string' }, // Typed data type's data
          { name: 'wallet', type: 'address' }, // Typed data type's data
        ],
      },
    primaryType: 'Person', // Primary type 
    message: { // Inferred from types
        from: { // 'From' parameters
          name: 'vars.name', // 'From' name
          wallet: `0x${vars.address}`, // 'From' wallet
        },
        to: {
          name: 'vars.name', // 'To' name
          wallet: `0x${vars.address}`, // 'To' wallet
        },
        contents: 'vars.contents', // Message's contents
      },
    signature: `0x${vars.signature}`, // The signature of the typed data
    blockNumber: 1n, // Only used when verifying a typed data that was signed by a Smart Contract Account - Optional
    blockTag: vars.blockTag, // Only used when verifying a typed data that was signed by a Smart Contract Account - Optional
});

// prepareTransactionRequest()
// Prepares a transaction request for signing by populating a nonce, gas limit, fee values, and a transaction type
// const kzg = setupKzg(cKzg, mainnetTrustedSetupPath) 

const prepareTransactionRequest = await publicClient.prepareTransactionRequest({
    account: vars.account, // The Account to send the transaction from
    to: vars.addressTo, // The transaction recipient or contract address
    accessList: [ // The access list - Optional
        {
            address: `0x${vars.address}`, // Account address
            storageKeys: [`0x${vars.keys}`], // Array of storage-keys that should be proofed and included
        },
    ],
    authorizationList: [], // Signed EIP-7702 Authorization list - Optional
    // blobs: toBlobs({ data: stringToHex('blobby blob!') }),  // Blobs for blob transactions - Optional
    chain: sepolia, // The target chain - Optional
    data: vars.data, // A contract hashed method call with encoded args - Optional
    // gas: 1n, // The gas limit of the transaction - Optional
    // gasPrice: 1n, // The price (in wei) to pay per gas - Optional
    maxFeePerGas: 1n, // Total fee per gas (in wei) - Optional
    maxPriorityFeePerGas: 1n, // Max priority fee per gas (in wei) - Optional
    nonce: 1, // Unique number identifying the transaction - Optional
    nonceManager: vars.nonceManager, // Nonce Manager to consume and increment the Account nonce for the transaction request - Optional
    parameters: ['fees', 'gas', 'blobVersionedHashes', 'chainId', 'nonce', 'sidecars', 'type'], // Parameters to prepare - Optional
    value: vars.value, // Value in wei sent with this transaction - Optional
});

// getTransaction()
// Returns information about a Transaction given a hash or block identifier
const getTransaction = await publicClient.getTransaction({
    // hash: `0x${vars.hash}`, // Get information about a transaction given a transaction hash - Optional
    // blockHash: `0x${vars.blockHash}`, // Get information about a transaction given a block hash - Optional
    blockNumber: 1n, // Get information about a transaction given a block number - Optional
    // blockTag: 'safe', // Get information about a transaction given a block tag - Optional
    index: 0, // An index to be used with a block identifier - Optional
});

// getTransactionConfirmations()
// Returns the number of blocks passed (confirmations) since the transaction was processed on a block
const getTransactionConfirmations = await publicClient.getTransactionConfirmations({
    hash: `0x${vars.hash}`, // The hash of the transaction
});

// getTransactionReceipt()
// Returns the transaction receipt given a transaction hash
const getTransactionReceipt = await publicClient.getTransactionReceipt({
    hash: `0x${vars.hash}`, // // The hash of the transaction
});

// sendRawTransaction()
// Sends a signed transaction to the network
const sendRawTransaction = await publicClient.sendRawTransaction({
    serializedTransaction: `0x${vars.serializedTransaction}`, // The signed serialized transaction
});

// waitForTransactionReceipt()
// Waits for the transaction to be included on a block (one confirmation), and then returns the transaction receipt
const waitForTransactionReceipt = await publicClient.waitForTransactionReceipt({
    hash: `0x${vars.hash}`, // The hash of the transaction
    confirmations: 5, // The number of confirmations (blocks that have passed) to wait before resolving - Optional
    onReplaced: replacement => console.log(replacement), // Optional callback to emit if the transaction has been replaced - Optional
    pollingInterval: 1, // Polling frequency (in ms) - Optional
    retryCount: 1, // Number of times to retry if the transaction or block is not found - Optional
    retryDelay: 1, // Time to wait (in ms) between retries - Optional
    timeout: 1, // Optional timeout (in milliseconds) to wait before stopping polling - Optional
});

// watchPendingTransactions()
// Watches and returns pending transaction hashes
const watchPendingTransactions = await publicClient.watchPendingTransactions({
    onTransactions: hashes => console.log(hashes), // The new pending transaction hashes
    batch: true, // Whether or not to batch the transaction hashes between polling intervals - Optional
    onError: error => console.log(error), // Error thrown from listening for new pending transactions - Optional
    poll: true, // Whether or not to use a polling mechanism to check for new pending transactions - Optional
    pollingInterval: 1, // Polling frequency (in ms) - Optional
});
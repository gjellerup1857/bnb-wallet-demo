from flask import Flask, request, jsonify
from web3 import Web3
from eth_account import Account

app = Flask(__name__)

w3 = Web3(Web3.HTTPProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545'))

@app.route('/send_bnb', methods=['POST'])
def send_bnb():
    data = request.get_json()
    private_key = data.get('private_key')
    recipient = data.get('recipient')
    amount = data['amount']
    
    try:
        account = Account.from_key(private_key)
        tx = {
            'nonce': w3.eth.get_transaction_count(account.address),
            'to': recipient,
            'value': w3.toWei(amount, 'ether'),
            'gas': 21000,
            'gasPrice': w3.eth.gas_price,
        }
        
        signed_tx = account.sign_transaction(tx)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        return jsonify({'tx_hash': tx_hash.hex()})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
if __name__ == '__main__':
    app.run(debug=True)


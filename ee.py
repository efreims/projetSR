from Crypto.Cipher import AES
import hashlib





mdp = "mika"

data_to_encrypt = "4X6223BLWW2QIQE4UQJROSUWQ5MBHN5C"

mdp = mdp.encode()
key = hashlib.sha256(mdp).digest()


data = data_to_encrypt.encode('utf-8')

# Create the cipher object and encrypt the data
cipher_encrypt = AES.new(key, AES.MODE_CFB)
ciphered_bytes = cipher_encrypt.encrypt(data)

# This is now our data
iv = cipher_encrypt.iv
ciphered_data = ciphered_bytes


output = str(iv.hex())+'>'+str(ciphered_data.hex())

print(output)


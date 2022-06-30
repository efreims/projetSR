from Crypto.Cipher import AES
import sys
import ast
import hashlib

input = ast.literal_eval(sys.argv[1]) 
received = input['data_sent'].split(".")

key = received[2]
iv = received[1]
ciphered_data= received[0]

ciphered_data = bytes.fromhex(ciphered_data)
iv = bytes.fromhex(iv)
key = key.encode()
key = hashlib.sha256(key).digest()
cipher_decrypt = AES.new(key, AES.MODE_CFB, iv=iv)
deciphered_bytes = cipher_decrypt.decrypt(ciphered_data)

decrypted_data = deciphered_bytes.decode('utf-8')
print(decrypted_data)
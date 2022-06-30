from Crypto.Cipher import AES
import hashlib
import sys
import ast


input = ast.literal_eval(sys.argv[1]) # dans input on a une chaine de caractères contenant n + clé publique du receveur + texte à transmettre

templist = input['data_sent'].split(".")

mdp = templist[0]

data_to_encrypt = templist[1]

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


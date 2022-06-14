import pyaes
key = "This_key_for_demo_purposes_only!"
plaintext = "Text may be any length you wish, no padding is required"

# key must be bytes, so we convert it
key = key.encode('utf-8')

aes = pyaes.AESModeOfOperationCTR(key)    
ciphertext = aes.encrypt(plaintext)

# show the encrypted data
print (ciphertext)

# DECRYPTION
# CRT mode decryption requires a new instance be created
aes = pyaes.AESModeOfOperationCTR(key)

# decrypted data is always binary, need to decode to plaintext
decrypted = aes.decrypt(ciphertext).decode('utf-8')

# True
print (decrypted)
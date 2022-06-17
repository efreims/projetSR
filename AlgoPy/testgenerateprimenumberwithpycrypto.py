from Crypto.Cipher import AES
# from Crypto.Random import get_random_bytes
from Crypto.Cipher import AES
from Crypto.PublicKey import RSA
from Crypto.Util import number
from Crypto.Util.number import GCD


# generate prime number with Crypto.Util.number


def generate_prime_number(bits):
    return number.getPrime(bits)


print('p =', generate_prime_number(2048))

# generate rsa keys and print them out


def generate_rsa_keys(bits):
    p = generate_prime_number(bits)
    q = generate_prime_number(bits)
    n = p * q
    phi = (p - 1) * (q - 1)
    e = number.getRandomRange(1, phi)
    g = GCD(e, phi)
    while g != 1:
        e = number.getRandomRange(1, phi)
        g = GCD(e, phi)
    d = number.inverse(e, phi)
    return ((e, n), (d, n))

t = generate_rsa_keys(2048)


print('\nRSA keys:')
 
print('\n')

print('Public key: (e, n) =', t[0])
print('Private key: (d, n) =', t[1])






def encrypt(pk, plaintext):
    key, n = pk
    cipher = [pow(ord(char), key, n) for char in plaintext]
    return cipher


def decrypt(pk, ciphertext):
    key, n = pk
    plain = [chr(pow(char, key, n)) for char in ciphertext]
    return ''.join(plain)


print('\nAES on private key:')
print('Encrypting a message with AES on private key:')
print('Plaintext:', 'Attack at dawn')
print('Ciphertext:', encrypt(generate_rsa_keys(2048)[1], 'Attack at dawn'))
print('Decrypting the ciphertext:')
print('Decrypted ciphertext:', decrypt(generate_rsa_keys(2048)[1], encrypt(generate_rsa_keys(2048)[1], 'Attack at dawn')))

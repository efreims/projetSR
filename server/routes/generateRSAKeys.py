from Crypto.Cipher import AES
# from Crypto.Random import get_random_bytes
from Crypto.Cipher import AES
from Crypto.PublicKey import RSA
from Crypto.Util import number
from Crypto.Util.number import GCD


# generate prime number with Crypto.Util.number


def generate_prime_number(bits):
    return number.getPrime(bits)


#print('p =', generate_prime_number(2048))

# generate rsa keys and print them out


def generate_rsa_keys(bits):
    p = generate_prime_number(bits)
    q = generate_prime_number(bits)
    n = p * q
    phi = (p - 1) * (q - 1)
    print("phi="+str(phi))
    e = number.getRandomRange(1, phi)
    g = GCD(e, phi)
    while g != 1:
        e = number.getRandomRange(1, phi)
        g = GCD(e, phi)
    d = number.inverse(e, phi)
    return ((e, n), (d, n))

t = generate_rsa_keys(2048)


#print('\nRSA keys:')
 
#print('\n')
e = t[0][0]
n = t[0][1]
d = t[1][0]
#print("e=" + str(e))
#print("n=" + str(n))
#print("d=" + str(d))
output = str(e)+" "+str(d)+" "+str(n)
print(output)
#print('Public key: (e, n) =', t[0])
#print('Private key: (d, n) =', t[1])


# AES on t[1][0]
#cipheredkey = AES.new(t[1][0],AES.MODE_EAX).encrypt('hello')
#print('\nAES key:', cipheredkey)

# cipheredkey = AES.new(t[1][0]).encrypt('Hello World')
# print('\nAES on private key:', cipheredkey)
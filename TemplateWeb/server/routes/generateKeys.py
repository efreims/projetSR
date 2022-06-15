import random
import math
import sys
import json
import ast

from GenerateHugePrimeNumber import generate_prime_number
from GenerateHugePrimeNumber import rabin_miller_test

def multiplicative_inverse(a, b):
    x = 0
    y = 1
    ly = 1
    lx = 1
    while b != 0:
        q = a // b
        a, b = b, a % b
        x, lx = lx - q * x, x
        y, ly = ly - q * y, y
    if lx < 0:
        lx += b
    if ly < 0:
        ly += b
    return lx

def generate_keypair(p, q):
    if not (rabin_miller_test(p,7) and rabin_miller_test(q,7)):
        raise ValueError('Both numbers must be prime.')
    elif p == q:
        raise ValueError('p and q cannot be equal')
    n = p * q
    phi = (p - 1) * (q - 1)
    e = random.randrange(1, phi)
    g = math.gcd(e, phi)
    while g != 1:
        e = random.randrange(1, phi)
        g = math.gcd(e, phi)
    d = multiplicative_inverse(e, phi)
    return (e,d,n)

p = generate_prime_number(512)
q = generate_prime_number(512)
public, private,n = generate_keypair(p, q)
output = str(public)+" "+str(private)+" "+str(n)
#print("output = "+ str(output))
print(output)
sys.stdout.flush()
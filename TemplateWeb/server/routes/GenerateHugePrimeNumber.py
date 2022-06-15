import random

def generate_prime_number(n):
    return random.getrandbits(n)
    
def decomp_miller(nbtest):
    i = 2
    compt = 1
    while ((nbtest-1)%i == 0):
        i = i*2
        compt += 1
    return compt-1

def square_and_multiply(x, k, p=None):
    b = bin(k).lstrip('0b')
    r = 1
    for i in b:
        r = r**2
        if i == '1':
            r = r * x
        if p:
            r %= p
    return r

def rabin_miller_try(d,a,nb,s):
    x = square_and_multiply(a,d,nb)
    if x == 1:
        return False
    
    for i in range(s):
        x = square_and_multiply(a,2**i * d,nb)
        if x == nb-1:
            return False
    return True
    

def rabin_miller_test(nb,acc):
    ptemp = nb-1
    is_prime = True
    s = decomp_miller(nb)
    d = ptemp//(2**s)
    
    assert ptemp == 2**s * d   # assert sert juste à controler que la condition est respectée sinon génère une erreur 
    
    for i in range (acc):
        a = random.randrange(2, nb-2)
        if rabin_miller_try(d,a,nb,s):
            is_prime = False
    return is_prime
            
  
def generate_prime_number(n):
    acc = 7
    found = False
    generated = random.getrandbits(n)
    while not found :
        if rabin_miller_test(generated,acc):
            found = True
            return generated
        generated += 1
    return generated
        

import math
import sys
import ast

def encrypt(key,n,plaintext):
    cipher = [pow(ord(char), key, n) for char in plaintext]
    return cipher

input = ast.literal_eval(sys.argv[1]) # dans input on a une chaine de caractères contenant n + clé publique du receveur + texte à transmettre
templist = input.split("¤©◄")

output = encrypt(templist[0],templist[1],templist[2])

print(output)
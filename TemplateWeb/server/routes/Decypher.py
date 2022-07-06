import math
import sys
import ast


def decrypt(key,n,ciphertext):
    plain = [chr(pow(int(char), key, n)) for char in ciphertext]
    return ''.join(plain)

input = ast.literal_eval(sys.argv[1]) # dans input on a une chaine de caractères contenant n + clé privée du receveur + texte à transmettre
received = input['data_sent'].split("µ")

text = received[2]
toremove = "[]"

for i in range(len(toremove)):
    text = text.replace(toremove[i],"")
    
templist = text.split(", ")

output = decrypt(int(received[0]),int(received[1]),templist)

print(output)
import math
import sys
import ast


def decrypt(key,n,ciphertext):
    #plain = pow(int(ciphertext[0]),key,n)
    plain = [pow(int(char), key, n) for char in ciphertext]
    return plain

input = ast.literal_eval(sys.argv[1]) # dans input on a une chaine de caractères contenant n + clé privée du receveur + texte à transmettre
received = input['data_sent'].split("µ")

text = received[2]
toremove = "[]"

for i in range(len(toremove)):
    text = text.replace(toremove[i],"")
    
templist = text.split(", ")
#print(int(templist[0]))
#print(received[0])
#print(int(received[1]))
output = decrypt(int(received[0]),int(received[1]),templist)

print(output)
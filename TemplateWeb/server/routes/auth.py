import pyotp
import sys
import ast

input = ast.literal_eval(sys.argv[1])
templist = input['data_sent'].split("µ")
pv = templist[0]
code = templist[1]

totp = pyotp.TOTP(pv) #génération du code à 6 chiffres
print(code == totp.now()) #utiliser cette fonction afin de comparer pour l'authentification 2 facteurs
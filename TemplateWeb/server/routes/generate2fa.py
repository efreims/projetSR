import pyotp

test = pyotp.random_base32()
print(test) #génération de la clé privée pour l'authentification
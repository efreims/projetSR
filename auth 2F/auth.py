import pyotp
test = pyotp.random_base32()
print(test) #génération de la clé privée pour l'authentification
test2 = (pyotp.totp.TOTP(test).provisioning_uri(name='test', issuer_name='Secure App')) #création de l'URL
print(test2)
totp = pyotp.TOTP("4X6223BLWW2QIQE4UQJROSUWQ5MBHN5C") #génération du code à 6 chiffres
print("Current OTP:", totp.now()) #utiliser cette fonction afin de comparer pour l'authentification 2 facteurs
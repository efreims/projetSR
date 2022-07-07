import sys
import ast

# traduction decryptage 

temp = ast.literal_eval(sys.argv[1]).split(', ')
for j in range (len(temp)):
    varverif = temp[j][0] + temp[j][1]
    if (varverif!="10" and varverif!="11" and varverif!="12"):
        temp[j] = str(0) + temp[j]
temp2 = ''.join(temp)

temp3 = []
temp4 = []
temp5 = []
varverif = temp[0] + temp[1]

   
for i in range (len(temp2)):
    temp3.append(temp2[i])
    if (len(temp3)==3):
        temp4.append(''.join(temp3))
        temp3 = []

#print(temp4)
for i in range (len(temp4)):
    temp5.append(chr(int(temp4[i])))
temp5 = ''.join(temp5)
print(temp5)



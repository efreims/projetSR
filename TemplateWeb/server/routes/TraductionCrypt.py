x = "padfjpznvizeiflahzdiauhiaudhauzdhhhhhhhhhhhhhhhuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"
temp = []
for i in range (len(x)):
    tempvar = str(ord(x[i]))
    if (len(tempvar)==2):
        tempvar = str(0) + tempvar
    temp.append(tempvar)
print(temp)

varfin = ''.join(temp)
print(varfin)

# recupérer varfin et segmenter en liste 1D
temp2 = []
temp3 = []
temp4 = ""

for i in range (len(varfin)):
    temp3.append(varfin[i])
    if (len(temp3)==300):
        temp4 = ''.join(temp3)
        temp2.append(temp4)
        temp3 = []
        temp4 = ""
if (len(temp3)!=0):
    temp4 = ''.join(temp3)
    temp2.append(temp4)
print(temp2)





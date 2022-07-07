import sys
import ast

x = ast.literal_eval(sys.argv[1])['data_sent']
temp = []
for i in range (len(x)):
    tempvar = str(ord(x[i]))
    if (len(tempvar)==2):
        tempvar = str(0) + tempvar
    temp.append(tempvar)
    tempvar = ""

varfin = ''.join(temp)

# recupérer varfin et segmenter en liste 1D
temp2 = []
temp3 = []
temp4 = ""

for i in range (len(varfin)):
    temp3.append(varfin[i])
    if (len(temp3)==300):
        
        temp4 = ''.join(temp3)
        tt = temp4[0] + temp4[1]
        #if (tt!="10" and tt!="11" and tt!="12" and tt[0]!="0"):
            #temp4 = str(0) + temp4
        temp2.append(temp4)
        temp3 = []
        temp4 = ""
if (len(temp3)!=0):
    temp4 = ''.join(temp3)
    temp2.append(temp4)
print(temp2)





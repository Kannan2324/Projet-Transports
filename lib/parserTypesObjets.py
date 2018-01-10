import csv
from collections import Counter

with open('data/objets-trouves-gares.csv', newline='') as file:
	spamreader = csv.reader(file, delimiter=';', quotechar='|')
	liste = []
	for row in spamreader:
		liste.append(row)


del liste[0]
objet = []

type_Gare = []
liste_Gare_Lyon = ["Collonges Fontaines", "Lyon Guillotière", "Sérézin","Sathonay Rillieux", "Crépieux la Pape",
 "Lyon St Clair","St Priest","Givors Ville","Givors Canal","Vernaison","Oullins","Lyon Perrache Marchandises",
 "Lyon St Clair","Francheville","Brignais","Civrieux d'Azergues","La Tour de Salvagny","Pontcharra St Forgeux",
 "L'Arbresle","Chazay Marcilly","Pierre Bénite","Les Flachères","Millery Montagny","Chamelet","Bois d'Oingt Légny",
 "Sain Bel","Écully la Demi Lune","Charbonnières les Bains","Casino Lacroix Laval","Tarare","St Romain de Popey",
 "St Germain au Mont d'Or","Loire","Trèves Burel","Lyon Perrache","Dommartin Lissieu", "Dardilly les Mouilles",
 "Chaponost","Givors Canal","Lamure sur Azergues","Ternand","Châtillon d'Azergues","Lozanne","Lyon St Paul",
 "Lyon Gorge de Loup","Tassin","Givors Canal","Ste Colombe les Vienne St Romain","Condrieu","St Georges de Reneins",
 "St Germain au Mont d'Or","Couzon au Mont d'Or","Lyon Perrache Voyageurs","Sathonay Rillieux","Lyon St Exupéry TGV",
 "Alai","Poule","Allières","Badan","Lentilly","Fleurieux sur l'Arbresle","Amplepuis","Belleville sur Saône",
 "Albigny Neuville","Lyon Guillotière","St Fons","Feyzin","Sibelin","Neuville sur Saône","Villefranche sur Saône",
 "Anse","Quincieux","Lyon Vaise","Direction Régionale Rhône Alpes","Lyon Jean Macé","Ternay","Lyon St Clair",
 "Port Édouard Herriot","Lyon Part Dieu","Heyrieux","Chandieu Toussieu","Vénissieux Nord","Vénissieux Voyageurs",
 "Givors Canal","Badan","Le Sablon","Sathonay Rillieux","Dardilly le Jubin","Tassin","Chessy","L'Arbresle",
 "Courzieu Brussieu","Ste Foy l'Argentière","Le Méridien","La Ferrière","Lozanne​"]

for i in liste:
	if '2016' in i[0]:
		
		if i[4] in liste_Gare_Lyon:
			type_Gare.append(i[4])
			objet.append(i)


gare_set = set(type_Gare)
print(gare_set)


objetPerrache = []
objetPartDieu = []
for i in objet:
	if i[4]=="Lyon Perrache":
		objetPerrache.append(i)
	else:
		objetPartDieu.append(i)

print(len(objetPerrache))
print(len(objetPartDieu))

natureObjPerrache = []
natureObjPartDieu = []
for i in objetPerrache:
	natureObjPerrache.append(i[1])
for i in objetPartDieu:
	natureObjPartDieu.append(i[1])

perrache = Counter(natureObjPerrache)
partdieu = Counter(natureObjPartDieu)

print(perrache)
print(partdieu)


"""
Ce parser retourne le nombre d'objets trouvés par type pour les gares du rhône.
On s'en rend compte que sur l'année 2016, seul deux gares ont des données sur les objets
trouvés, à savoir Lyon Perrache et Lyon Part-Dieu.
Counter({'Bagagerie: sacs, valises, cartables': 573, 'Porte-monnaie / portefeuille, argent, titres': 362, "Pièces d'identités et papiers personnels": 316, 'Appareils électroniques, informatiques, appareils photo': 260, 'Vêtements, chaussures': 93, 'Optique': 47, 'Livres, articles de papéterie': 47, 'Clés, porte-clés, badge magnétique': 45, 'Vélos, trotinettes, accessoires 2 roues': 24, 'Vélos, trottinettes, accessoires 2 roues': 24, 'Divers': 15, "Articles d'enfants, de puériculture": 9, 'Articles de sport, loisirs, camping': 9, 'Articles médicaux': 5, 'Instruments de musique': 4, 'Bijoux, montres': 4, 'Parapluies': 1})
Counter({'Bagagerie: sacs, valises, cartables': 910, 'Appareils électroniques, informatiques, appareils photo': 415, 'Porte-monnaie / portefeuille, argent, titres': 244, 'Vêtements, chaussures': 170, "Pièces d'identités et papiers personnels": 115, 'Optique': 87, 'Clés, porte-clés, badge magnétique': 78, 'Livres, articles de papéterie': 43, 'Divers': 38, 'Vélos, trotinettes, accessoires 2 roues': 26, 'Vélos, trottinettes, accessoires 2 roues': 26, "Articles d'enfants, de puériculture": 15, 'Articles de sport, loisirs, camping': 15, 'Parapluies': 12, 'Bijoux, montres': 12, 'Articles médicaux': 10, 'Instruments de musique': 5})

"""

donnee_perrache = [573,362,316,260,93,47,47,45,24,24,15,9,9,5,4,4,1]
donnee_partdieu = [910,244,115,415,170,87,43,78,26,26,38,15,15,10,5,12,12]
print(sum(donnee_perrache))

def calcul(x): return (x/ sum(donnee_perrache)) *100
per_perrache = list(map(calcul,donnee_perrache))
format_perrache = [ '%.2f' % elem for elem in per_perrache ]
print(format_perrache)

"""
Pourcentage des objets trouvés sur la gare perrache
['31.18', '19.70', '17.19', '14.15', '5.06', '2.56', '2.56', '2.45', '1.31', '1.31', '0.82', '0.49', '0.49', '0.27', '0.22', '0.22', '0.05']
"""

def calcul2(x): return (x/ sum(donnee_partdieu)) *100
per_partdieu = list(map(calcul2,donnee_partdieu))
format_partdieu = [ '%.2f' % elem for elem in per_partdieu ]
print(format_partdieu)

"""
['40.97', '10.99', '5.18', '18.69', '7.65', '3.92', '1.94', '3.51', '1.17', '1.17', '1.71', '0.68', '0.68', '0.45', '0.23', '0.54', '0.54']
"""








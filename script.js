var width = window.innerWidth/3,
		height = 580,
		active = d3.select(null);

var color = d3.scaleQuantize()
	.range(["rgb(237,248,233)", "rgb(186,228,179)",
	"rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);

var tooltip = d3.select('body')
	.append('div')
	.attr('class', 'hidden tooltip');

var svg = d3.select( ".div1" )
	.append( "svg" )
	.attr( "width", width )
	.attr( "height", height );

var svg2 = d3.select( ".div2" )
	.append( "svg" )
	.attr( "width", width )
	.attr( "height", height );

var svg3 = d3.select( ".div3" )
	.append( "svg" )
	.attr( "width", width )
	.attr( "height", height );

var svgpie = d3.select( ".pie" )
	.append( "svg" )
	.attr( "width", window.innerWidth)
	.attr( "height", height);

//On centre sur la France
var projection = d3.geoConicConformal()
	.center([2.454071, 46.279229])
	.scale(2800)
	// sans la commande enlève la Corse mais centre la France!
	.translate([width/2, height/2]);

var projection2 = d3.geoConicConformal()
	.center([5, 45.4])
	.scale(6500)
	// sans la commande enlève la Corse mais centre la France!
	.translate([width/2, height/2]);

var projection3 = d3.geoConicConformal()
	.center([4.75, 45.9])
	.scale(30000)
	// sans la commande enlève la Corse mais centre la France!
	.translate([width/2, height/2]);

var path = d3.geoPath() // d3.geo.path avec d3 version 3
	.projection(projection);

var path2 = d3.geoPath() // d3.geo.path avec d3 version 3
	.projection(projection2);

var path3 = d3.geoPath() // d3.geo.path avec d3 version 3
	.projection(projection3);

var geoPath = d3.geoPath()
	.projection(projection)
	.pointRadius(1);

var geoPath2 = d3.geoPath()
	.projection(projection2)
	.pointRadius(2);

var geoPath3 = d3.geoPath()
	.projection(projection3)
	.pointRadius(4);

var g = svg.append("g")
	.style("stroke-width", "1.5px");

var g2 = svg2.append("g")
	.style("stroke-width", "1.5px");

var g3 = svg3.append("g")
	.style("stroke-width", "1.5px");

// var svgpie = d3.select(".pie")
// 	.append("svg")
// 	.append("g")

svgpie.append("g")
	.attr("class", "slices");
svgpie.append("g")
	.attr("class", "labelName");
svgpie.append("g")
	.attr("class", "labelValue");
svgpie.append("g")
	.attr("class", "lines");

var radius = Math.min(960, 450) / 2;

var pie = d3.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

var outerArc = d3.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

var legendRectSize = (radius * 0.05);
var legendSpacing = radius * 0.02;


var div = d3.select(".pie").append("div").attr("class", "toolTip");

svgpie.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var colorRange = d3.scaleOrdinal(d3.schemeCategory20);
var color = d3.scaleOrdinal()
	.range(colorRange.range());

var reg_dep_France = {
	"Auvergne-Rhône-Alpes":["Allier","Puy-de-Dôme","Cantal","Loire","Haute-Loire","Ardèche","Rhône","Drôme","Isère","Ain","Savoie","Haute-Savoie"],
	"Bourgogne-Franche-Comté":["Saône-et-Loire","Doubs","Côte-d'Or","Yonne","Jura","Haute-Saône","Nièvre","Territoire de Belfort"],
	"Bretagne":["Côtes-d'Armor","Finistère","Ille-et-Vilaine","Morbihan"],
	"Centre-Val de Loire":["Cher","Eure-et-Loir","Indre","Indre-et-Loire","Loir-et-Cher","Loiret"],
	"Corse":["Haute-Corse","Corse-du-Sud"],
	"Grand Est":["Ardennes","Aube","Marne","Haute-Marne","Meurthe-et-Moselle","Meuse","Moselle","Bas-Rhin","Haut-Rhin","Vosges"],
	"Hauts-de-France":["Aisne","Nord","Oise","Pas-de-Calais","Somme"],
	"Île-de-France":["Paris","Seine-et-Marne","Yvelines","Essonne","Hauts-de-Seine","Seine-Saint-Denis","Val-de-Marne","Val-d'Oise"],
	"Normandie":["Calvados","Eure","Manche","Orne","Seine-Maritime"],
	"Nouvelle-Aquitaine":["Charente","Charente-Maritime","Corrèze","Creuse","Dordogne","Gironde","Landes","Lot-et-Garonne","Pyrénées-Atlantiques","Deux-Sèvres","Vienne","Haute-Vienne"],
	"Occitanie":["Ariège","Aude","Aveyron","Gard","Haute-Garonne","Gers","Hérault","Lot","Lozère","Hautes-Pyrénées","Pyrénées-Orientales","Tarn","Tarn-et-Garonne"],
	"Pays de la Loire":["Loire-Atlantique","Maine-et-Loire","Mayenne","Sarthe","Vendée"],
	"Provence-Alpes-Côte d'Azur":["Alpes-de-Haute-Provence","Hautes-Alpes","Alpes-Maritimes","Bouches-du-Rhône","Var","Vaucluse"]
};

var dep_auvergne_rhone_alpes = ["Allier","Puy-de-Dôme","Cantal","Loire","Haute-Loire","Ardèche","Rhône","Drôme",
	"Isère","Ain","Savoie","Haute-Savoie"];

function convertCase(str){
	str = str.toLowerCase();
	str = str.replace(/ /g, "-");
	str = str.replace("'", "-");
	str = str.replace("à", "a");
	str = str.replace("â", "a");
	str = str.replace("é", "e");
	str = str.replace("è", "e");
	str = str.replace("ê", "e");
	str = str.replace("ë", "e");
	str = str.replace("î", "i");
	str = str.replace("ï", "i");
	str = str.replace("ç", "c");
	str = str.replace("ô", "o");
	str = str.replace("ö", "o");
	str = str.replace("û", "u");
	str = str.replace("ù", "u");
	str = str.replace("ü", "u");
	return str;
};

function clicked(d) {
	let clickedName = this.__data__.properties.nom;
	let depCode = this.__data__.properties.code;

	if (active.node() === this) return reset();
	active.classed("active", false);
	active = d3.select(this).classed("active", true);
	let classes = this.parentNode.parentNode.classList;

	if (classes[3] == "div2"){
		let url = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements/"+depCode+"-"+convertCase(clickedName)+"/arrondissements-"+depCode+"-"+convertCase(clickedName)+".geojson";
		d3.json(url, function(json) {
			svg3.selectAll("*").remove();
			svg3.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("fill","#9fc")
				.attr("stroke","#fff")
				.attr("d",path3)
				.attr("class", "feature")
				.on("click", clicked)
				.on('mousemove', function(d) {
					var mouse = d3.mouse(svg3.node()).map(function(d) {
						return parseInt(d);
					});
					tooltip.classed('hidden', false)
						.attr('style', 'left:' + (mouse[0] + 15 + width*2) +
							'px; top:' + (mouse[1] - 35) + 'px;background-color: #f88')
					//console.log(d.properties.nom)
						.html('<strong>'+d.properties.nom+'</strong>');
					})
				.on('mouseout', function() {
					tooltip.classed('hidden', true);
					});

			d3.json("https://raw.githubusercontent.com/Kannan2324/Projet-Transports/master/data/liste-des-gares.geojson", function(jsonGare) {
				var liste_gare3 = svg3.append("svg");
				liste_gare3.selectAll("path")
				.data(jsonGare.features.filter(function(d){
					return d.properties.departement === clickedName;
				}))
				.enter()
				.append("path")
				.attr("fill","#b42e6b")
				.attr("d", geoPath3)
				.on('mousemove', function(d) {
					var mouse3 = d3.mouse(svg3.node()).map(function(d) {
						return parseInt(d);
					});
					tooltip.classed('hidden', false)
						.attr('style', 'left:' + (mouse3[0] + 15 + width*2) +
							'px; top:' + (mouse3[1] - 35) + 'px;background-color: #fff')
						.html(d.properties.libelle_gare);
					})
				.on('mouseout', function() {
					tooltip.classed('hidden', true);
					});;
			})

				svg3.append("path")
					.attr("class", "mesh")
					.attr("d", path);
		});
	} else if (classes[3] == "div1"){
		d3.json("https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions/"+convertCase(clickedName)+"/departements-"+convertCase(clickedName)+".geojson", function(json) {
			svg2.selectAll("*").remove();
			svg2.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("fill","#99ff99")
				.attr("stroke","#fff")
				.attr("d",path2)
				.attr("class", "feature")
				.on("click", clicked)
				.on('mousemove', function(d) {
					var mouse = d3.mouse(svg2.node()).map(function(d) {
						return parseInt(d);
					});
					tooltip.classed('hidden', false)
						.attr('style', 'left:' + (mouse[0] + 15 + width) +
							'px; top:' + (mouse[1] - 35) + 'px;background-color: #f88')
					//console.log(d.properties.nom)
						.html('<strong>'+d.properties.nom+'</strong>');
					})
				.on('mouseout', function() {
					tooltip.classed('hidden', true);
					});

			d3.json("https://raw.githubusercontent.com/Kannan2324/Projet-Transports/master/data/liste-des-gares.geojson", function(jsonGare) {
				var liste_gare2 = svg2.append("svg");
				liste_gare2.selectAll("path")
				.data(jsonGare.features.filter(function(d){
					return reg_dep_France[clickedName].indexOf(d.properties.departement) !== -1;
				}))
				.enter()
				.append("path")
				.attr("fill","#b42e6b")
				.attr("d", geoPath2)
				.on('mousemove', function(d) {
					var mouse2 = d3.mouse(svg2.node()).map(function(d) {
						return parseInt(d);
					});
					tooltip.classed('hidden', false)
						.attr('style', 'left:' + (mouse2[0] + 15 + width) +
							'px; top:' + (mouse2[1] - 35) + 'px;background-color: #fff')
						.html(d.properties.libelle_gare);
					})
				.on('mouseout', function() {
					tooltip.classed('hidden', true);
					});;
			})

			svg2.append("path")
				.attr("class", "mesh")
				.attr("d", path);
		});
	};

	var bounds = path.bounds(d),
	dx = bounds[1][0] - bounds[0][0],
	dy = bounds[1][1] - bounds[0][1],
	x = (bounds[0][0] + bounds[1][0]) / 2,
	y = (bounds[0][1] + bounds[1][1]) / 2,
	scale = .9 / Math.max(dx / width, dy / height),
	translate = [width / 2 - scale * x, height / 2 - scale * y];

	g.transition()
		.duration(750)
		.style("stroke-width", 1.5 / scale + "px")
		.attr("transform", "translate(" + translate + ")scale(" + scale + ")");
}

function reset() {
	active.classed("active", false);
	active = d3.select(null);
}

d3.json("https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson", function(json) {
	svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("fill","#99ff99")
		.attr("stroke","#fff")
		.attr("d",path)
		.attr("class", "feature")
		.on("click", clicked)
		.on('mousemove', function(d) {
			var mouse = d3.mouse(svg.node()).map(function(d) {
				return parseInt(d);
			});
			tooltip.classed('hidden', false)
				.attr('style', 'left:' + (mouse[0] + 15) +
					'px; top:' + (mouse[1] - 35) + 'px;background-color: #f88')
			//console.log(d.properties.nom)
				.html('<strong>'+d.properties.nom+'</strong>');
			})
		.on('mouseout', function() {
			tooltip.classed('hidden', true);
			});

		svg.append("path")
			.attr("class", "mesh")
			.attr("d", path);
	
	d3.json("https://raw.githubusercontent.com/Kannan2324/Projet-Transports/master/data/liste-des-gares.geojson", function(jsonGare) {
		var liste_gare = svg.append("svg");
		liste_gare.selectAll("path")
		.data(jsonGare.features)
		.enter()
		.append("path")
		.attr("fill","#b42e6b")
		.attr("d", geoPath)
		.on('mousemove', function(d) {
			var mouse = d3.mouse(svg.node()).map(function(d) {
				return parseInt(d);
			});
			tooltip.classed('hidden', false)
				.attr('style', 'left:' + (mouse[0] + 15) +
					'px; top:' + (mouse[1] - 35) + 'px;background-color: #fff')
				.html(d.properties.libelle_gare);
			})
		.on('mouseout', function() {
			tooltip.classed('hidden', true);
			});;
	})
});

// Données obtenues avec le parser lib/parserTypesObjets.py 
// Graphique illisible si on garde toute les catégories,
// On va regrouper les dernières en une seule et même catégorie: "Autre"
data_Perrache = [31.18, 19.70, 17.19, 14.15, 5.06, 2.56, 2.56, 2.45, 1.31, 1.31, 0.82, 0.49, 0.49, 0.27, 0.22, 0.22, 0.05];
  
var valeur_autre = data_Perrache.slice(8);

var autre = valeur_autre.reduce((a, b) => a + b, 0);
var autre2 = (Math.floor(autre * 100) / 100).toFixed(2);

data_Perrache_light = [31.18, 19.70, 17.19, 14.15, 5.06, 2.56, 2.56, 2.45, autre2]
data_PartDieu = [40.97, 10.99, 5.18, 18.69, 7.65, 3.92, 1.94, 3.51, 1.17, 1.17, 1.71, 0.68, 0.68, 0.45, 0.23, 0.54, 0.54];
dataPartDieu_sort = [40.97, 18.69, 10.99, 7.65, 5.18, 3.92, 3.51, 1.94, 1.71, 1.17, 1.17, 0.68, 0.68, 0.54, 0.54, 0.45, 0.23]

var valeur_autre2 = dataPartDieu_sort.slice(6);
var autre_partdieu = valeur_autre2.reduce((a, b) => a + b, 0);
var autre_partdieu2 = (Math.floor(autre_partdieu * 100) / 100).toFixed(2);

dataPartDieu_sort_light = [40.97, 18.69, 10.99, 7.65, 5.18, 3.92, 3.51, autre_partdieu2];

//Types d'objets classés du plus présent au moins présent dans la gare perrache
type_objets_Perrache = ["Bagagerie", "Porte-monnaie","Pièces d'identités", "Appareils électroniques", "Vêtements, chaussures", "Optique", "Livres", "Clés", "Vélos, trotinettes", "Vélos, trottinette","Divers", "Articles d'enfants", "Articles de sport", "Articles médicaux","Instruments de musique", "Bijoux", "Parapluies"]
//Types d'objets classés du plus présent au moins présent dans la gare part-dieu
type_objets_PartDieu = ["Bagagerie", "Appareils électroniques", "Porte-monnaie", "Vêtements, chaussures", "Pièces d'identités", "Optique", "Clés", "Divers", "Vélos, trotinettes", "Vélos, trottinette", "Articles d'enfants", "Articles de sport", "Parapluies", "Bijoux","Articles médicaux", "Instruments de musique"]


type_objets_light = ["Bagagerie", "Porte-monnaie","Pièces d'identités", "Appareils électroniques", "Vêtements, chaussures", "Optique", "Livres", "Clés", "Autre"]

type_objets_PartDieu_light = ["Bagagerie", "Appareils électroniques", "Porte-monnaie", "Vêtements, chaussures", "Pièces d'identités", "Optique", "Clés", "Autre"]


datasetOption1 = [
				{label:type_objets_light[0], value:data_Perrache_light[0]}, 
		{label:type_objets_light[1], value:data_Perrache_light[1]}, 
		{label:type_objets_light[2], value:data_Perrache_light[2]},
		{label:type_objets_light[3], value:data_Perrache_light[3]},
		{label:type_objets_light[4], value:data_Perrache_light[4]},
		{label:type_objets_light[5], value:data_Perrache_light[5]},
			// Cette ligne qui affiche la valeur des livres pour Perrache
				// Ne fonctionne pas, nous n'arrivons pas à trouver l'erreur
			//{label:type_objets_light[6], value:data_Perrache_light[6]},
			{label:type_objets_light[7], value:data_Perrache_light[7]},
			{label:type_objets_light[8], value:data_Perrache_light[8]},
		// Données illisibles car superposée (du fait de leur faible pourcentage)
		// Ils sont tous stockés dans l'attribut "Autre"
		//	{label:type_objets[9], value:data_Perrache[9]},
		//	{label:type_objets[10], value:data_Perrache[10]},
		//	{label:type_objets[11], value:data_Perrache[11]},
		//	{label:type_objets[12], value:data_Perrache[12]},
		//	{label:type_objets[13], value:data_Perrache[13]},
		//	{label:type_objets[14], value:data_Perrache[14]},
		//	{label:type_objets[15], value:data_Perrache[15]},
		];

datasetOption2 = [
		  {label:type_objets_PartDieu_light[0], value:dataPartDieu_sort_light[0]}, 
		{label:type_objets_PartDieu_light[1], value:dataPartDieu_sort_light[1]}, 
		{label:type_objets_PartDieu_light[2], value:dataPartDieu_sort_light[2]},
		{label:type_objets_PartDieu_light[3], value:dataPartDieu_sort_light[3]},
		{label:type_objets_PartDieu_light[4], value:dataPartDieu_sort_light[4]},
		{label:type_objets_PartDieu_light[5], value:dataPartDieu_sort_light[5]},
			{label:type_objets_PartDieu_light[6], value:dataPartDieu_sort_light[6]},
			{label:type_objets_PartDieu_light[7], value:dataPartDieu_sort_light[7]},
		// Données illisibles car superposée (du fait de leur faible pourcentage)
		// Ils sont tous stockés dans l'attribut "Autre"
		//  {label:type_objets_PartDieu_light[8], value:dataPartDieu_sort[8]},
		//	{label:type_objets_PartDieu[9], value:dataPartDieu_sort[9]},
		//	{label:type_objets_PartDieu[10], value:dataPartDieu_sort[10]},
		//	{label:type_objets_PartDieu[11], value:dataPartDieu_sort[11]},
		//	{label:type_objets_PartDieu[12], value:dataPartDieu_sort[12]},
		//	{label:type_objets_PartDieu[13], value:dataPartDieu_sort[13]},
		//	{label:type_objets_PartDieu[14], value:dataPartDieu_sort[14]},
		//	{label:type_objets_PartDieu[15], value:dataPartDieu_sort[15]},
		];

d3.selectAll("input")
	.on("change", selectDataset);
	
function selectDataset(){
  change(datasetOption1);
	var value = this.value;
  //var value = d3.select('input[name="dataset"]:checked').node().value;
	
	if (value == "option1")
	{
		change(datasetOption1);
	}
	else if (value == "option2")
	{
		change(datasetOption2);
	}
}

function change(data) {

	/* ------- PIE SLICES -------*/
	var slice = svgpie.select(".slices").selectAll("path.slice")
		.data(pie(data), function(d){ return d.data.label });

	slice.enter()
		.insert("path")
		.style("fill", function(d) { return color(d.data.label); })
		.attr("class", "slice");

	slice
		.transition().duration(1000)
		.attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})
	slice
		.on("mousemove", function(d){
			div.style("left", d3.event.pageX+10+"px");
			div.style("top", d3.event.pageY-25+"px");
			div.style("display", "inline-block");
			div.html((d.data.label)+"<br>"+(d.data.value)+"%");
		});
	slice
		.on("mouseout", function(d){
			div.style("display", "none");
		});

	slice.exit()
		.remove();

   
	/* ------- TEXT LABELS -------*/

	var text = svgpie.select(".labelName").selectAll("text")
		.data(pie(data), function(d){ return d.data.label });

	text.enter()
		.append("text")
		.attr("dy", ".35em")
		.text(function(d) {
			return (d.data.label+": "+d.value+"%");
		});

	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(1000)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		})
		.text(function(d) {
			return (d.data.label+": "+d.value+"%");
		});


	text.exit()
		.remove();

	/* ------- SLICE TO TEXT POLYLINES -------*/

	var polyline = svgpie.select(".lines").selectAll("polyline")
		.data(pie(data), function(d){ return d.data.label });

	polyline.enter()
		.append("polyline");

	polyline.transition().duration(1000)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};
		});

	polyline.exit()
		.remove();
};

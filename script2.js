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

var selected_region = "Auvergne-Rhône-Alpes"
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
}

var dep_auvergne_rhone_alpes = ["Allier","Puy-de-Dôme","Cantal","Loire","Haute-Loire","Ardèche","Rhône","Drôme",
	"Isère","Ain","Savoie","Haute-Savoie"]

d3.json("https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson", function(json) {
	svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("fill","#888")
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

function clicked(d) {
	console.log(this);
	if (active.node() === this) return reset();
	active.classed("active", false);
	active = d3.select(this).classed("active", true);
	let classes = this.parentNode.parentNode.classList
	selected_region = d.properties.nom
	var name = transform_name(selected_region)
	carte_region = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions/"+name+"/departements-"+name+".geojson"

	if (classes[3] == "div1"){
		d3.json(carte_region, function(json) {
			svg2.selectAll("*").remove();
			svg2.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("fill","#888")
				.attr("stroke","#fff")
				.attr("d",path2)
				.attr("class", "feature")
				.on("click", clicked)
				.on('mousemove', function(d) {
					var mouse = d3.mouse(svg2.node()).map(function(d) {
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

				map_region(carte_region)
			})}
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
	//map_region(carte_region)
}

function reset() {
	active.classed("active", false);
	active = d3.select(null);
}



function transform_name(name){


	var str = name.toLowerCase()
	for(var i = 0; i<str.length;i++){
		str = str.replace(" ", "-");
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



	}
	
	return str;
};




// #######################################################@
// ##### Région
var carte_region = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions/auvergne-rhone-alpes/departements-auvergne-rhone-alpes.geojson"
function map_region(carte_region){
var projection2 = d3.geoConicConformal()
	.center([5, 45])
	.scale(6500)
	// sans la commande enlève la Corse mais centre la France!
	.translate([width/2, height/2]);

var path2 = d3.geoPath() // d3.geo.path avec d3 version 3
	.projection(projection2);


var geoPath2 = d3.geoPath()
	.projection(projection2)
	.pointRadius(2);

var g2 = svg2.append("g")
	.style("stroke-width", "1.5px");




	d3.json(carte_region, function(json) {
	svg2.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("fill","#888")
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
})


	d3.json("https://raw.githubusercontent.com/Kannan2324/Projet-Transports/master/data/liste-des-gares.geojson", function(jsonGare) {
		var liste_gare2 = svg2.append("svg");
		liste_gare2.selectAll("path")
		.data(jsonGare.features.filter(function(d){

			return reg_dep_France[selected_region].indexOf(d.properties.departement) !== -1;
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
	
};	
//});

// ########################################################
// ###### Departement

var projection3 = d3.geoConicConformal()
	.center([4.75, 45.9])
	.scale(30000)
	// sans la commande enlève la Corse mais centre la France!
	.translate([width/2, height/2]);

var path3 = d3.geoPath() // d3.geo.path avec d3 version 3
	.projection(projection3);


var geoPath3 = d3.geoPath()
	.projection(projection3)
	.pointRadius(2);

var g3 = svg3.append("g")
	.style("stroke-width", "1.5px");

d3.json("https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements/69-rhone/arrondissements-69-rhone.geojson", function(json) {
	svg3.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("fill","#888")
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
			return d.properties.departement === "Rhône";
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
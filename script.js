var width = window.innerWidth/3,
		height = 580,
		active = d3.select(null);

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

var color = d3.scaleQuantize()
	.range(["rgb(237,248,233)", "rgb(186,228,179)",
	"rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);

//On centre sur la France
var projection = d3.geoConicConformal()
	.center([2.454071, 46.279229])
	.scale(2800)
	// sans la commande enlève la Corse mais centre la France!
	.translate([width/2, height/2]);

var path = d3.geoPath() // d3.geo.path avec d3 version 3
	.projection(projection);

var tooltip = d3.select('body')
	.append('div')
	.attr('class', 'hidden tooltip');

var geoPath = d3.geoPath()
	.projection(projection)
	.pointRadius(2);

var g = svg.append("g")
	.style("stroke-width", "1.5px");

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
	if (active.node() === this) return reset();
	active.classed("active", false);
	active = d3.select(this).classed("active", true);
}

function reset() {
	active.classed("active", false);
	active = d3.select(null);
}

// #######################################################@
// ##### Région

var projection2 = d3.geoConicConformal()
	.center([5, 45.4])
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

d3.json("https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions/auvergne-rhone-alpes/departements-auvergne-rhone-alpes.geojson", function(json) {
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

		svg2.append("path")
			.attr("class", "mesh")
			.attr("d", path);
	
	
});

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

		svg3.append("path")
			.attr("class", "mesh")
			.attr("d", path);
});
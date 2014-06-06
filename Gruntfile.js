module.exports = function (grunt) {

    // load the task
    grunt.loadNpmTasks("grunt-typescript");
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
    // Configure grunt here
    grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n'
		},
        typescript: {
            dist: {
                src: ["_references.ts", "lib/**/*.ts","src/**/*.ts"],
                dest: 'dist/elasticui.js',
				options: {
					declaration: true
				}
            },
			dev: {
				src: ["_references.ts", "lib/**/*.ts","src/**/*.ts"],
                dest: 'dist/elasticui.js',
				options: {
					watch: 'src',
					declaration: true
				}
			}
        },
		uglify: {
			options: {
				banner: '<%= meta.banner %>', // TODO also add banner to non-minified
				ascii_only: true
			},
			dist: {
				src: ['<%= typescript.dist.dest %>'],
				dest: 'dist/elasticui.min.js'
			}
		}
    });

    grunt.registerTask("default", ["typescript:dist", "uglify"]);
	grunt.registerTask("dev", ["typescript:dev"]);
}
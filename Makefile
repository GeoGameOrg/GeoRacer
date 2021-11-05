start:
	xfce4-terminal -e  'npm run hybrid'
	nvim

install:
	git clone git@github.com:GeoGameOrg/api-server.git backend/
	npm i
	
clean:
	rm -rf backend/
	rm -rf node_modules/
	rm package-lock.json

start:
	xfce4-terminal -e "npm run dev"
	xfce4-terminal -e "nodemon ./backend/main.ts"
	nvim

install:
	npm i 



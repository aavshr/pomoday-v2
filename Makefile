.PHONY: deploy
deploy:
	npm run dist
	rm -rf ./pomoday-port/dist
	mv ./dist ./pomoday-port/
	cd pomoday-port && deta deploy
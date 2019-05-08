FROM mhart/alpine-node:10

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -g gulp
RUN npm install
RUN npm install --only=dev
RUN npm link gulp
# COPY . .

EXPOSE 3000

# ENTRYPOINT ["gulp"]
CMD ["ls"]
FROM docker.adeo.no:5000/pus/node

ARG VERSION=""
ENV VERSION=${VERSION}

ADD . /source
WORKDIR /source

RUN npm install
RUN npm version ${VERSION} --no-git-tag-version
RUN cat /root/.npmrc
RUN npm publish
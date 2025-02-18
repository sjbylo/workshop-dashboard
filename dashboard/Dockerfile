FROM quay.io/openshiftlabs/workshop-terminal:2.10.2

USER root

RUN cd /opt/workshop && \
    git clone --single-branch --branch style-overrides --depth 5 https://github.com/GrahamDumpleton/workshopper.git workshopper && \
    cd /opt/workshop/workshopper && \
    git checkout 59c31293df7d762d268e75977ef0e62c10b1015c

COPY workshopper/. /opt/workshop/workshopper/.

RUN cd /opt/workshop/workshopper && \
    source scl_source enable rh-ruby25 && \
    bundle install --deployment && \
    bundle exec rake assets:precompile && \
    rm -rf tmp log && \
    mkdir -p tmp log && \
    chown -R 1001:0 tmp log db && \
    fix-permissions tmp && \
    fix-permissions log && \
    fix-permissions db

RUN HOME=/opt/workshop/reveal.js && \
    mkdir /opt/workshop/reveal.js && \
    cd /opt/workshop/reveal.js && \
    curl -sL -o src.tar.gz https://github.com/hakimel/reveal.js/archive/3.7.0.tar.gz && \
    tar --strip-components 1 -xf src.tar.gz && \
    rm src.tar.gz

COPY raneto /opt/workshop/raneto

RUN HOME=/opt/workshop/raneto && \
    cd /opt/workshop/raneto && \
    source scl_source enable rh-nodejs8 && \
    npm install --production && \
    npm run gulp

COPY renderer /opt/workshop/renderer

RUN HOME=/opt/workshop/renderer && \
    cd /opt/workshop/renderer && \
    source scl_source enable rh-nodejs8 && \
    npm install --production

RUN HOME=/opt/workshop/gateway && \
    cd /opt/workshop/gateway && \
    source scl_source enable rh-nodejs8 && \
    npm install axios-retry

COPY gateway/. /opt/workshop/gateway/.

COPY bin/. /opt/workshop/bin/.
COPY etc/. /opt/workshop/etc/.

USER 1001

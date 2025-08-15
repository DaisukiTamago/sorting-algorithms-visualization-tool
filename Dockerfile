FROM oven/bun

COPY . .
RUN bun install

EXPOSE 3000/tcp

CMD [ "bun", "run", "start" ]
#!/bin/bash
docker run -d -p 7001:7001 --rm --network todolist-network --name client client
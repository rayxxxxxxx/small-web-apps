#!/bin/bash
docker run -d -v todolist-volume:/app/data --rm --network todolist-network --name api api
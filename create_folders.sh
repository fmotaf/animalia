#!/bin/bash

animals=("leao" "elefante" "girafa" "tigre" "lobo" "canguru" "pinguim" "baleia" "Golfinho" "Tubarao"
         "jacare" "urso" "zebra" "rinoceronte" "hipopotamo" "camelo" "cavalo" "macaco" "coala" "lontra"
         "raposa" "gorila" "bicho-preguica" "antilope" "flamingo" "aguia" "coruja" "tucano" "pato" "corvo")

for animal in "${animals[@]}"; do
    mkdir "$animal"
done


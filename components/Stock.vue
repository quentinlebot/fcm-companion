<template>
    <div class="flex flex-col relative ">
        <h3 class="text-center my-5 text-5xl uppercase font-bold kansas">Stock</h3>
        <p id="title" class="font-bold uppercase divider md:mx-[10%]">Select player's food's amount</p>
        <div class="italic mt-2 md:mt-20 text-center" v-if="players.length < 1">
            Start with adding players
            <nuxt-link class="link link-primary" to="/player">here</nuxt-link>
        </div>
        <div v-if="players.length > 1">
            <div class="flex justify-center h-100px gap-2">
                <div class="flex flex-col place-items-center" v-for="p in players" :key="p.name" @click="selectPlayer(p)">
                    <img :src="p.restaurant.img" alt=""
                        :class="['rounded-full', p.name == selected.name ? 'h-12 md:h-20' : 'grayscale opacity-50 h-8 w-8 md:h-16 md:w-16']" />
                    <span :class="['text-xl', p.name == selected.name ? 'text-primary' : '']">{{ p.name }}</span>
                    <span :class="['opacity-50', 'text-xs', 'md:text-lg']">{{
                        p.getNbrOfProduct() }}
                        foods</span>
                </div>
            </div>
            <div class="flex justify-center mt-5">
                <div class="flex gap-2 md:gap-10 justify-center place-items-center flex-wrap">
                    <div class="flex flex-col justify-center place-items-center gap-2 mb-5 md:h-[20vh] w-full">
                        <span class="text-center kansas">Clear</span>
                        <div class="btn-group btn-group-vertical lg:btn-group-horizontal">
                            <button class="btn btn-active" @click="selected.resetFoodAndDrink()">This player</button>
                            <button class="btn" @click="reset(players)">all players</button>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="flex flex-col justify-center place-items-center">
                            <span @click="selected.increaseFoodAndDrink(Product.BURGER, -1)"
                                :class="['text-2xl', 'kansas', 'cursor-pointer', 'md:mb-5', selected.getFoodAndDrink(Product.BURGER) == 0 ? 'opacity-40' : '']">{{
                                    selected.getFoodAndDrink(Product.BURGER)
                                }}</span>
                            <svg width="35px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.BURGER)">
                                <path style="fill:#996b2b;fill-opacity:1;stroke-width:0.35277781"
                                    d="m 94.881436,158.67264 c -2.00293,-0.47455 -3.60153,-2.56073 -3.60153,-4.70003 0,-0.55139 -0.30247,-0.97447 -0.88714,-1.24086 -1.9137,-0.87194 -1.90238,-4.02429 0.0162,-4.50583 0.58003,-0.14557 0.8689,-0.54972 1.03829,-1.45262 0.50599,-2.69716 3.44804,-5.9041 6.76027,-7.36892 5.610364,-2.48117 12.916744,-1.54933 17.036724,2.17283 1.6343,1.47648 3.01313,3.6488 3.35203,5.28102 0.12952,0.62376 0.5465,1.21031 1.00317,1.41111 1.85658,0.81636 1.93229,3.6204 0.12005,4.44611 -0.65645,0.2991 -0.91174,0.76703 -1.09872,2.0139 -0.30465,2.03152 -1.95469,3.73136 -3.94055,4.05948 -1.89992,0.31391 -18.391934,0.21713 -19.798784,-0.11619 z" />
                            </svg>
                            <svg width="45px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.BURGER, 5)">
                                <path style="fill:#996b2b;fill-opacity:1;stroke-width:0.35277781"
                                    d="m 94.881436,158.67264 c -2.00293,-0.47455 -3.60153,-2.56073 -3.60153,-4.70003 0,-0.55139 -0.30247,-0.97447 -0.88714,-1.24086 -1.9137,-0.87194 -1.90238,-4.02429 0.0162,-4.50583 0.58003,-0.14557 0.8689,-0.54972 1.03829,-1.45262 0.50599,-2.69716 3.44804,-5.9041 6.76027,-7.36892 5.610364,-2.48117 12.916744,-1.54933 17.036724,2.17283 1.6343,1.47648 3.01313,3.6488 3.35203,5.28102 0.12952,0.62376 0.5465,1.21031 1.00317,1.41111 1.85658,0.81636 1.93229,3.6204 0.12005,4.44611 -0.65645,0.2991 -0.91174,0.76703 -1.09872,2.0139 -0.30465,2.03152 -1.95469,3.73136 -3.94055,4.05948 -1.89992,0.31391 -18.391934,0.21713 -19.798784,-0.11619 z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center place-items-center">
                            <span @click="selected.increaseFoodAndDrink(Product.PIZZA, -1)"
                                :class="['text-2xl', 'kansas', 'cursor-pointer', 'md:mb-5', selected.getFoodAndDrink(Product.PIZZA) == 0 ? 'opacity-40' : '']">{{
                                    selected.getFoodAndDrink(Product.PIZZA)
                                }}</span>
                            <svg width="35px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.PIZZA)">
                                <path style="fill:#ee7500;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 94.715023,163.07584 c -1.04163,-0.73705 -3.38376,-4.53368 -4.27721,-6.93342 -1.60405,-4.30839 -1.70374,-10.035 -0.24926,-14.31905 1.38702,-4.08536 4.24605,-8.22208 5.6806,-8.21923 1.08499,0.002 2.92144,1.32182 3.15952,2.27043 0.23167,0.92304 0.72683,1.21195 13.379377,7.80623 6.63751,3.45935 8.38111,4.4761 8.42884,4.91515 0.0387,0.35607 -1.76133,1.37266 -10.72189,6.05523 -9.99893,5.22519 -10.852627,5.73487 -11.072357,6.61035 -0.40102,1.5978 -3.05886,2.71206 -4.32762,1.81431 z" />
                            </svg>
                            <svg width="45px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.PIZZA, 5)">
                                <path style="fill:#ee7500;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 94.715023,163.07584 c -1.04163,-0.73705 -3.38376,-4.53368 -4.27721,-6.93342 -1.60405,-4.30839 -1.70374,-10.035 -0.24926,-14.31905 1.38702,-4.08536 4.24605,-8.22208 5.6806,-8.21923 1.08499,0.002 2.92144,1.32182 3.15952,2.27043 0.23167,0.92304 0.72683,1.21195 13.379377,7.80623 6.63751,3.45935 8.38111,4.4761 8.42884,4.91515 0.0387,0.35607 -1.76133,1.37266 -10.72189,6.05523 -9.99893,5.22519 -10.852627,5.73487 -11.072357,6.61035 -0.40102,1.5978 -3.05886,2.71206 -4.32762,1.81431 z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center place-items-center">
                            <span @click="selected.increaseFoodAndDrink(Product.BEER, -1)"
                                :class="['text-2xl', 'kansas', 'cursor-pointer', 'md:mb-5', selected.getFoodAndDrink(Product.BEER) == 0 ? 'opacity-40' : '']">{{
                                    selected.getFoodAndDrink(Product.BEER)
                                }}</span>
                            <svg width="35px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.BEER)">
                                <path style="fill:#004c35;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 98.846396,165.35484 c -0.460309,-0.65718 -0.549171,-2.16526 -0.549171,-9.31997 v -8.53592 l 1.430098,-2.76267 c 1.631287,-3.15132 2.270807,-6.42753 1.921387,-9.84308 -0.14163,-1.3845 -0.0668,-2.47567 0.21162,-3.0868 l 0.4307,-0.94529 h 2.73109 2.73109 l 0.39602,1.13602 c 0.23249,0.66694 0.30397,1.94963 0.17309,3.10643 -0.36001,3.18203 0.38551,6.84711 1.98607,9.76385 l 1.39439,2.54102 v 8.78139 8.78138 l -0.64514,0.58385 c -0.54232,0.4908 -1.52298,0.58384 -6.15361,0.58384 h -5.508464 z" />
                            </svg>
                            <svg width="45px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.BEER, 5)">
                                <path style="fill:#004c35;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 98.846396,165.35484 c -0.460309,-0.65718 -0.549171,-2.16526 -0.549171,-9.31997 v -8.53592 l 1.430098,-2.76267 c 1.631287,-3.15132 2.270807,-6.42753 1.921387,-9.84308 -0.14163,-1.3845 -0.0668,-2.47567 0.21162,-3.0868 l 0.4307,-0.94529 h 2.73109 2.73109 l 0.39602,1.13602 c 0.23249,0.66694 0.30397,1.94963 0.17309,3.10643 -0.36001,3.18203 0.38551,6.84711 1.98607,9.76385 l 1.39439,2.54102 v 8.78139 8.78138 l -0.64514,0.58385 c -0.54232,0.4908 -1.52298,0.58384 -6.15361,0.58384 h -5.508464 z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center place-items-center">
                            <span @click="selected.increaseFoodAndDrink(Product.COKE, -1)"
                                :class="['text-2xl', 'kansas', 'cursor-pointer', 'md:mb-5', selected.getFoodAndDrink(Product.COKE) == 0 ? 'opacity-40' : '']">{{
                                    selected.getFoodAndDrink(Product.COKE)
                                }}</span>
                            <svg width="35px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.COKE)">
                                <path style="fill:#a80a0f;fill-opacity:1;stroke-width:0.35277775"
                                    d="m 99.292292,165.21592 c -0.81956,-0.81955 -0.88577,-1.08563 -0.68031,-2.73403 0.12518,-1.00436 0.4897,-2.87031 0.81003,-4.14656 0.54287,-2.16284 0.54218,-2.48633 -0.0101,-4.7625 -0.84185,-3.46937 -0.75583,-6.25591 0.29221,-9.46649 0.485608,-1.48762 1.109118,-3.0557 1.385588,-3.48461 0.77237,-1.19826 1.34149,-5.07792 1.07796,-7.34849 l -0.23565,-2.03039 1.28884,-0.24179 c 1.68504,-0.31612 4.43465,0.004 4.77572,0.55569 0.14778,0.2391 0.1288,0.94135 -0.0422,1.56055 -0.42656,1.54489 0.14785,5.7454 1.01925,7.45349 2.14789,4.2102 2.74195,8.89622 1.66215,13.1111 -0.54444,2.12518 -0.53609,2.23592 0.55281,7.32667 0.5083,2.37632 0.38897,3.32706 -0.53334,4.24937 -0.83441,0.83441 -1.04032,0.8659 -5.66048,0.8659 -4.68041,0 -4.81619,-0.0216 -5.702478,-0.90791 z" />
                            </svg>
                            <svg width="45px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.COKE, 5)">
                                <path style="fill:#a80a0f;fill-opacity:1;stroke-width:0.35277775"
                                    d="m 99.292292,165.21592 c -0.81956,-0.81955 -0.88577,-1.08563 -0.68031,-2.73403 0.12518,-1.00436 0.4897,-2.87031 0.81003,-4.14656 0.54287,-2.16284 0.54218,-2.48633 -0.0101,-4.7625 -0.84185,-3.46937 -0.75583,-6.25591 0.29221,-9.46649 0.485608,-1.48762 1.109118,-3.0557 1.385588,-3.48461 0.77237,-1.19826 1.34149,-5.07792 1.07796,-7.34849 l -0.23565,-2.03039 1.28884,-0.24179 c 1.68504,-0.31612 4.43465,0.004 4.77572,0.55569 0.14778,0.2391 0.1288,0.94135 -0.0422,1.56055 -0.42656,1.54489 0.14785,5.7454 1.01925,7.45349 2.14789,4.2102 2.74195,8.89622 1.66215,13.1111 -0.54444,2.12518 -0.53609,2.23592 0.55281,7.32667 0.5083,2.37632 0.38897,3.32706 -0.53334,4.24937 -0.83441,0.83441 -1.04032,0.8659 -5.66048,0.8659 -4.68041,0 -4.81619,-0.0216 -5.702478,-0.90791 z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center place-items-center">
                            <span @click="selected.increaseFoodAndDrink(Product.JUICE, -1)"
                                :class="['text-2xl', 'kansas', 'cursor-pointer', 'md:mb-5', selected.getFoodAndDrink(Product.JUICE) == 0 ? 'opacity-40' : '']">{{
                                    selected.getFoodAndDrink(Product.JUICE)
                                }}</span>
                            <svg width="35px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.JUICE)">
                                <path style="fill:#ffc700;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 97.967385,163.82875 c -0.1866,-0.24255 -0.52983,-2.26661 -0.762734,-4.49793 -0.232903,-2.23132 -0.566995,-5.24757 -0.742426,-6.70278 -0.175432,-1.45521 -0.49624,-4.31271 -0.712906,-6.35 -0.216666,-2.03729 -0.514718,-4.69297 -0.662337,-5.90152 -0.169603,-1.38852 -0.135779,-2.32997 0.09189,-2.55764 0.208734,-0.20873 2.315367,-0.36028 5.008128,-0.36028 h 4.64785 l 0.21625,-1.08123 c 0.2939,-1.4695 1.92443,-3.01263 3.68386,-3.4864 3.48115,-0.93737 6.90929,2.37898 6.18787,5.98609 -0.26718,1.3359 -2.62073,3.8732 -3.59271,3.8732 -0.55929,0 -0.7077,0.49738 -1.07895,3.61598 -0.70447,5.9176 -1.02029,8.68623 -1.47888,12.96458 -0.23918,2.23132 -0.58754,4.25538 -0.77414,4.49793 -0.24122,0.31352 -1.69062,0.44096 -5.01538,0.44096 -3.324757,0 -4.774157,-0.12744 -5.015383,-0.44096 z" />
                            </svg>
                            <svg width="45px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.JUICE, 5)">
                                <path style="fill:#ffc700;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 97.967385,163.82875 c -0.1866,-0.24255 -0.52983,-2.26661 -0.762734,-4.49793 -0.232903,-2.23132 -0.566995,-5.24757 -0.742426,-6.70278 -0.175432,-1.45521 -0.49624,-4.31271 -0.712906,-6.35 -0.216666,-2.03729 -0.514718,-4.69297 -0.662337,-5.90152 -0.169603,-1.38852 -0.135779,-2.32997 0.09189,-2.55764 0.208734,-0.20873 2.315367,-0.36028 5.008128,-0.36028 h 4.64785 l 0.21625,-1.08123 c 0.2939,-1.4695 1.92443,-3.01263 3.68386,-3.4864 3.48115,-0.93737 6.90929,2.37898 6.18787,5.98609 -0.26718,1.3359 -2.62073,3.8732 -3.59271,3.8732 -0.55929,0 -0.7077,0.49738 -1.07895,3.61598 -0.70447,5.9176 -1.02029,8.68623 -1.47888,12.96458 -0.23918,2.23132 -0.58754,4.25538 -0.77414,4.49793 -0.24122,0.31352 -1.69062,0.44096 -5.01538,0.44096 -3.324757,0 -4.774157,-0.12744 -5.015383,-0.44096 z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center place-items-center">
                            <span @click="selected.increaseFoodAndDrink(Product.SUSHI, -1)"
                                :class="['text-2xl', 'kansas', 'cursor-pointer', 'md:mb-5', selected.getFoodAndDrink(Product.SUSHI) == 0 ? 'opacity-40' : '']">{{
                                    selected.getFoodAndDrink(Product.SUSHI)
                                }}</span>
                            <svg width="35px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.SUSHI)">
                                <path style="fill:#f35858;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 93.500525,154.47508 c -0.38805,-0.38805 -0.70555,-0.84944 -0.70555,-1.0253 0,-0.17865 -0.55637,-0.14902 -1.26061,0.0671 -1.01949,0.31289 -1.32612,0.2897 -1.60311,-0.12122 -0.61902,-0.9183 -0.11919,-3.76383 0.97081,-5.52687 2.21982,-3.59047 6.53048,-5.659 12.498635,-5.99764 5.80224,-0.32923 10.62252,0.92011 13.57411,3.5182 3.59835,3.1674 4.67496,9.27382 1.41664,8.03501 l -0.94768,-0.3603 -0.89048,1.05827 -0.89048,1.05828 H 104.93444 94.206085 Z" />
                            </svg>
                            <svg width="45px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.SUSHI, 5)">
                                <path style="fill:#f35858;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 93.500525,154.47508 c -0.38805,-0.38805 -0.70555,-0.84944 -0.70555,-1.0253 0,-0.17865 -0.55637,-0.14902 -1.26061,0.0671 -1.01949,0.31289 -1.32612,0.2897 -1.60311,-0.12122 -0.61902,-0.9183 -0.11919,-3.76383 0.97081,-5.52687 2.21982,-3.59047 6.53048,-5.659 12.498635,-5.99764 5.80224,-0.32923 10.62252,0.92011 13.57411,3.5182 3.59835,3.1674 4.67496,9.27382 1.41664,8.03501 l -0.94768,-0.3603 -0.89048,1.05827 -0.89048,1.05828 H 104.93444 94.206085 Z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center place-items-center">
                            <span @click="selected.increaseFoodAndDrink(Product.NOODLE, -1)"
                                :class="['text-2xl', 'kansas', 'cursor-pointer', 'md:mb-5', selected.getFoodAndDrink(Product.NOODLE) == 0 ? 'opacity-40' : '']">{{
                                    selected.getFoodAndDrink(Product.NOODLE)
                                }}</span>
                            <svg width="35px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.NOODLE)">
                                <path style="fill:#592792;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 99.109659,157.89453 c -0.12935,-0.12935 -0.23518,-0.50902 -0.23518,-0.8437 0,-0.36009 -0.37202,-0.70189 -0.91126,-0.83723 -3.81922,-0.95856 -8.31243,-6.54801 -8.8392,-10.99574 l -0.21237,-1.79312 3.27172,-0.23224 c 1.79944,-0.12773 5.8446,-0.23223 8.989231,-0.23223 h 5.71751 l 3.6651,-1.20495 c 6.6004,-2.16997 9.83168,-3.07437 10.19092,-2.85235 0.54394,0.33617 0.41917,1.16318 -0.23032,1.52665 -0.3658,0.20471 -0.49754,0.55108 -0.35294,0.92792 0.17713,0.46157 -0.0865,0.72588 -1.13453,1.13757 l -1.36527,0.53629 -0.20267,1.96367 c -0.42526,4.12035 -3.8669,8.85654 -7.85469,10.80917 -1.34971,0.66089 -1.91179,1.14035 -1.91179,1.63079 v 0.69469 h -4.17454 c -2.29599,0 -4.280371,-0.10584 -4.409721,-0.23519 z" />
                            </svg>
                            <svg width="45px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.NOODLE, 5)">
                                <path style="fill:#592792;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 99.109659,157.89453 c -0.12935,-0.12935 -0.23518,-0.50902 -0.23518,-0.8437 0,-0.36009 -0.37202,-0.70189 -0.91126,-0.83723 -3.81922,-0.95856 -8.31243,-6.54801 -8.8392,-10.99574 l -0.21237,-1.79312 3.27172,-0.23224 c 1.79944,-0.12773 5.8446,-0.23223 8.989231,-0.23223 h 5.71751 l 3.6651,-1.20495 c 6.6004,-2.16997 9.83168,-3.07437 10.19092,-2.85235 0.54394,0.33617 0.41917,1.16318 -0.23032,1.52665 -0.3658,0.20471 -0.49754,0.55108 -0.35294,0.92792 0.17713,0.46157 -0.0865,0.72588 -1.13453,1.13757 l -1.36527,0.53629 -0.20267,1.96367 c -0.42526,4.12035 -3.8669,8.85654 -7.85469,10.80917 -1.34971,0.66089 -1.91179,1.14035 -1.91179,1.63079 v 0.69469 h -4.17454 c -2.29599,0 -4.280371,-0.10584 -4.409721,-0.23519 z" />
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center place-items-center">
                            <span
                                :class="['text-2xl', 'kansas', 'cursor-pointer', 'md:mb-5', selected.getFoodAndDrink(Product.KIMCHI) == 0 ? 'opacity-40' : '']">{{
                                    selected.getFoodAndDrink(Product.KIMCHI)
                                }}</span>
                            <svg width="35px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.KIMCHI)">
                                <path style="fill:#8fd123;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 102.27249,165.18687 c -0.52497,-0.27692 -1.2736,-0.95165 -1.66363,-1.4994 -0.760398,-1.06789 -2.599808,-4.93912 -3.035678,-6.38894 -0.14583,-0.48507 -0.79661,-1.71519 -1.44617,-2.73361 -1.30537,-2.04662 -2.64513,-5.06168 -3.33131,-7.49694 -1.04122,-3.69531 -1.01437,-4.48885 0.20071,-5.93289 0.50551,-0.60077 0.88194,-1.49329 0.88194,-2.09109 0,-3.5052 2.83946,-6.62504 6.845598,-7.52157 1.58739,-0.35524 2.04046,-0.33095 3.08667,0.16551 1.13032,0.53637 1.33228,0.53754 2.58316,0.0149 1.83211,-0.7655 3.49435,-0.42336 4.49075,0.92434 0.42652,0.57689 1.5768,1.41598 2.55618,1.86465 4.05101,1.85581 5.54444,7.13564 3.78064,13.366 -0.89506,3.16168 -1.79294,4.9144 -3.35536,6.54989 -0.61271,0.64137 -1.07868,1.23501 -1.03548,1.31921 0.1954,0.38086 -1.98809,5.79225 -2.99119,7.41314 -0.48735,0.78749 -1.35393,1.7003 -1.92573,2.02847 -1.26297,0.72484 -4.28315,0.73466 -5.6411,0.0183 z" />
                            </svg>
                            <svg width="45px" viewBox="85 130 40 40" :class="['cursor-pointer']"
                                @click="selected.increaseFoodAndDrink(Product.KIMCHI, 5)">
                                <path style="fill:#8fd123;fill-opacity:1;stroke-width:0.35277778"
                                    d="m 102.27249,165.18687 c -0.52497,-0.27692 -1.2736,-0.95165 -1.66363,-1.4994 -0.760398,-1.06789 -2.599808,-4.93912 -3.035678,-6.38894 -0.14583,-0.48507 -0.79661,-1.71519 -1.44617,-2.73361 -1.30537,-2.04662 -2.64513,-5.06168 -3.33131,-7.49694 -1.04122,-3.69531 -1.01437,-4.48885 0.20071,-5.93289 0.50551,-0.60077 0.88194,-1.49329 0.88194,-2.09109 0,-3.5052 2.83946,-6.62504 6.845598,-7.52157 1.58739,-0.35524 2.04046,-0.33095 3.08667,0.16551 1.13032,0.53637 1.33228,0.53754 2.58316,0.0149 1.83211,-0.7655 3.49435,-0.42336 4.49075,0.92434 0.42652,0.57689 1.5768,1.41598 2.55618,1.86465 4.05101,1.85581 5.54444,7.13564 3.78064,13.366 -0.89506,3.16168 -1.79294,4.9144 -3.35536,6.54989 -0.61271,0.64137 -1.07868,1.23501 -1.03548,1.31921 0.1954,0.38086 -1.98809,5.79225 -2.99119,7.41314 -0.48735,0.78749 -1.35393,1.7003 -1.92573,2.02847 -1.26297,0.72484 -4.28315,0.73466 -5.6411,0.0183 z" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-col w-full place-items-center relative">
                        <span
                            class="text-lg kansas text-opacity-40 text-neutral-focus dark:text-gray-600 absolute -top-[80px] md:-top-[115px]">+1</span>
                        <span
                            class="text-lg kansas text-opacity-40 text-neutral-focus dark:text-gray-600 absolute -top-[40px] md:-top-[75px]">+5</span>
                    </div>
                </div>
            </div>
            <div class="flex w-full justify-center md:fixed md:bottom-8">
                <NuxtLink to="/house">
                    <button class="btn btn-outline mt-3">Next</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/main';
import { Product } from '~/types/types';

const store = useMainStore();

let { players } = storeToRefs(store);
let selected = ref(players.value[0]);

onMounted(() => {
    document.getElementById('title').scrollIntoView();
})

const selectPlayer = (player) => {
    selected.value = player;
};
const reset = () => {
    players.value.forEach((player) => {
        player.resetFoodAndDrink();
    });
};
</script>

<style></style>
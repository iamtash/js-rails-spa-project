# starbucks = Roaster.create(name: 'Starbucks', location: 'Seattle')
# illy = Roaster.create(name: 'illy', location: 'Italy')
# peets = Roaster.create(name: 'Peets Coffee', location: 'San Francisco')
# philz = Roaster.create(name: 'Philz Coffee', location: 'San Francisco')
# stumptown = Roaster.create(name: 'Stumptown', location: 'Portland')
# blue_bottle = Roaster.create(name: 'Blue Bottle', location: 'Oakland')
# cuvee = Roaster.create(name: 'Cuvee Coffee', location: 'Austin')
# intelligentsia = Roaster.create(name: 'Intelligentsia Coffee', location: 'Chicago')
# verve = Roaster.create(name: 'Verve', location: 'Santa Cruz')
# sweet_bloom = Roaster.create(name: 'Sweet Bloom', location: 'Colorado')
# caribou = Roaster.create(name: 'Caribou Coffee', location: 'Minneapolis')

# pike_place = Coffee.create(name: 'Pike Place', roast: 'dark', roaster: starbucks)
# big_bang = Coffee.create(name: 'Big Bang', roast: 'medium', roaster: peets)
# silken_splendor = Coffee.create(name: 'Silken Splendor', roast: 'medium', roaster: philz)
# philharmonic = Coffee.create(name: 'Philharmonic', roast: 'medium', roaster: philz)
# hairbender = Coffee.create(name: 'Hair Bender', roast: 'dark', roaster: stumptown)
# bella_donovan = Coffee.create(name: 'Bella Donovan', roast: 'dark', roaster: blue_bottle)
# colombia = Coffee.create(name: 'Colombia', roast: 'medium', roaster: cuvee)
# organic_french_roast = Coffee.create(name: 'Organic French Roast', roast: 'dark', roaster: intelligentsia)
# sermon = Coffee.create(name: 'Sermon', roast: 'medium', roaster: verve)
# hometown = Coffee.create(name: 'Hometown', roast: 'medium', roaster: sweet_bloom)
# daybreak = Coffee.create(name: 'Daybreak', roast: 'light', roaster: caribou)

# natasha = User.create(name: 'Natasha', email: 'natasha@email.com', password: 'password')
# jessica = User.create(name: 'Jessica', email: 'jessica@email.com', password: 'password')
# leeya = User.create(name: 'Leeya', email: 'leeya@email.com', password: 'password')
# tiff = User.create(name: 'Tiffany',  email: 'tiff@email.com', password: 'password')
# vladimir = User.create(name: 'Vladimir', email: 'vlad@email.com', password: 'password')
# daniel = User.create(name: 'Daniel', email: 'daniel@email.com', password: 'password')

# Brew.create(method: 'espresso')
# Brew.create(method: 'drip')
# Brew.create(method: 'pourover')
# Brew.create(method: 'cold brew')
# Brew.create(method: 'AeroPress')
# Brew.create(method: 'Turkish coffee')
# Brew.create(method: 'French press')

# cup1 = natasha.cups.create!(brew_id: 1, coffee_id: 1, rating: Rating.create(rating: 1))
# cup2 = jessica.cups.create!(brew_id: 2, coffee_id: 2, rating: Rating.create(rating: 2))
# cup3 = leeya.cups.create!(brew_id: 3, coffee_id: 3, rating: Rating.create(rating: 3))
# cup4 = tiff.cups.create!(brew_id: 4, coffee_id: 4, rating: Rating.create(rating: 4))
# cup5 = vladimir.cups.create!(brew_id: 5, coffee_id: 5, rating: Rating.create(rating: 5))
# cup6 = daniel.cups.create!(brew_id: 6, coffee_id: 6, rating: Rating.create(rating: 4))

# cup1.create_rating!(rating: 3)
# cup2.create_rating!(rating: 4)
# cup3.create_rating!(rating: 2)
# cup4.create_rating!(rating: 5)
# cup5.create_rating!(rating: 3)
# cup6.create_rating!(rating: 4)

starbucks = Roaster.find_by(name: 'Starbucks')
Coffee.create(name: 'Holiday Blend', roaster: starbucks, roast: 'medium')
Coffee.create(name: 'Bright Sky Blend Blend', roaster: starbucks, roast: 'light')
Coffee.create(name: 'Veranda Blend', roaster: starbucks, roast: 'light')
Coffee.create(name: 'Breakfast Blend', roaster: starbucks, roast: 'light')
Coffee.create(name: 'Colombia', roaster: starbucks, roast: 'medium')
Coffee.create(name: 'Sumatra', roaster: starbucks, roast: 'dark')
Coffee.create(name: 'Caffe Verona', roaster: starbucks, roast: 'dark')
Coffee.create(name: 'Italian Roast', roaster: starbucks, roast: 'dark')
Coffee.create(name: 'French Roast', roaster: starbucks, roast: 'dark')

peets = Roaster.find_by(name: 'Peets Coffee')
Coffee.create(name: 'Holiday Blend', roaster: peets, roast: 'dark')
Coffee.create(name: "Major Dickason's Blend", roaster: peets, roast: 'dark')
Coffee.create(name: "House Blend", roaster: peets, roast: 'dark')
Coffee.create(name: 'French Roast', roaster: peets, roast: 'dark')
Coffee.create(name: 'Cafe Domingo', roaster: peets, roast: 'medium')

illy = Roaster.find_by(name: 'illy')
Coffee.create(roaster: illy, name: 'Classico', roast: 'medium')
Coffee.create(roaster: illy, name: 'Intenso', roast: 'dark')
Coffee.create(roaster: illy, name: 'Forte', roast: 'dark')
Coffee.create(roaster: illy, name: 'Colombia', roast: 'medium')
Coffee.create(roaster: illy, name: 'Etiopia', roast: 'light')

philz = Roaster.find_by(name: 'Philz Coffee')
philz.coffees.create(name: 'Tesora', roast: 'medium')
philz.coffees.create(name: 'Ambrosia Coffee of God', roast: 'light')
philz.coffees.create(name: 'Aromatic Arabic', roast: 'dark')
philz.coffees.create(name: 'Canopy of Heaven', roast: 'light')
philz.coffees.create(name: 'Dancing Water', roast: 'light')
philz.coffees.create(name: 'Greater Alarm', roast: 'medium')

stumptown = Roaster.find_by(name: 'Stumptown')
stumptown.coffees.create(name: 'Holler Mountain', roast: 'medium')
stumptown.coffees.create(name: 'French Roast', roast: 'dark')
stumptown.coffees.create(name: 'House Blend', roast: 'medium')
stumptown.coffees.create(name: 'Evergreen', roast: 'dark')

blue_bottle = Roaster.find_by(name: 'Blue Bottle')
blue_bottle_coffees = [
                        {name: 'Giant Steps', roast: 'dark'},
                        {name: 'Three Africas', roast: 'light'},
                        {name: 'Beta Blend', roast: 'light'}
]
blue_bottle_coffees.each {|coffee_data| blue_bottle.coffees.create(coffee_data)}

cuvee = Roaster.find_by(name: 'Cuvee Coffee')
cuvee_coffees = [
                    {name: 'Ethiopia', roast: 'light'},
                    {name: 'Brazil', roast: 'medium'},
                    {name: 'Costa Rica', roast: 'medium'},
                    {name: 'Guatemala', roast: 'medium'},
                    {name: 'Indonesia', roast: 'medium'},
                    {name: 'Stella Cometa', roast: 'medium'},
                    {name: 'Moka Java', roast: 'medium'}
]
cuvee_coffees.each {|coffee_data| cuvee.coffees.create(coffee_data)}

intelligentsia = Roaster.find_by(name: 'Intelligentsia Coffee')
intelligentsia_coffees = [
                            {name: 'El Diablo', roast: 'dark'},
                            {name: 'House Blend', roast: 'medium'},
                            {name: 'Great Lakes Blend', roast: 'medium'},
                            {name: 'Illumination Blend', roast: 'medium'},
                            {name: 'El Gato Blend', roast: 'dark'}
]
intelligentsia_coffees.each {|coffee_data| intelligentsia.coffees.create(coffee_data)}

verve = Roaster.find_by(name: 'Verve')
verve_coffees = [
                    {name: 'Holiday Blend', roast: 'medium'},
                    {name: 'Streetlevel', roast: 'medium'},
                    {name: 'The 1950', roast: 'light'},
                    {name: 'Buena Vista', roast: 'dark'},
                    {name: 'Seabright House Blend', roast: 'medium'}
]
verve_coffees.each {|coffee_data| verve.coffees.create(coffee_data)}

sweet_bloom = Roaster.find_by(name: 'Sweet Bloom')
sweet_bloom_coffees = [
                        {name: 'Augusto Castillo', roast: 'medium'},
                        {name: 'Nigatu Wase', roast: 'medium'},
                        {name: 'Worka Sakaro', roast: 'medium'},
                        {name: 'Winter Bloom', roast: 'medium'}
]
sweet_bloom_coffees.each {|coffee_data| sweet_bloom.coffees.create(coffee_data)}

caribou = Roaster.find_by(name: 'Caribou Coffee')
caribou_coffees = [
                    {name: 'La Minita Peaberry', roast: 'light'},
                    {name: 'Caribou Blend', roast: 'medium'},
                    {name: 'Lakeshore Blend', roast: 'medium'},
                    {name: 'Fireside', roast: 'dark'},
                    {name: 'Obsidian', roast: 'dark'}
]
caribou_coffees.each {|coffee_data| caribou.coffees.create(coffee_data)}

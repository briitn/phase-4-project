puts "🌱 Seeding users..."
User.create!(username: "Seeder", password: "seedpass", profile_pic:"https://media.istockphoto.com/photos/slave-hands-broken-chains-with-bird-flying-picture-id1296601764?b=1&k=20&m=1296601764&s=170667a&w=0&h=0hjKKZZYp2Wl1BRxopegdWrJwTwi1Vlbs_aXdmhhr_o=" )

User.create!(username: "Seederbyday", password: "seederbynight", profile_pic: "https://yt3.ggpht.com/KdSCnLmkBuYFMCTqmPuBWjOYVj-2qhOckXAEw9m3ucl9GjVedNz1bBZ5XeA3h6DiaDWptwILkg=s900-c-k-c0x00ffffff-no-rj")

User.create!(username: "IbeSeeding", password: "seedinfolife", profile_pic: "https://www.localsyr.com/wp-content/uploads/sites/63/2022/05/Fattening-Up-by-Tommy-Jones.jpg?w=2040&h=1440&crop=1")
Post.create!(user_id: 1, bark: "hello")
Post.create!(user_id: 2, bark: "hey hey")
Post.create!(user_id: 3, bark: "I was seeded")
puts "✅ Done seeding!"
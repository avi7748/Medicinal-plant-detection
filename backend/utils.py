import mysql.connector

conn = mysql.connector.connect(
    host="gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    port=4000,
    user="3noUnQMNTbFvdod.root",
    password="LsBbou1VG9bSjYVj",
    database="medicinal_plants",
    ssl_disabled=False
)


cursor = conn.cursor()

with open("medicinal_plants_species_info.sql", "r", encoding="utf-8") as f:
    sql = f.read()

for statement in sql.split(";"):
    stmt = statement.strip()
    if stmt:
        try:
            cursor.execute(stmt)
        except Exception as e:
            print(e)

conn.commit()
conn.close()

print("Import Complete")
# Szin_tippelo_jatek
Kis beadandó JS projekt


Játék:

RGB kód alapján megtippelni a színt a 3/6 lehetőség közül

A játék funkciói:
-	RGB kód generálása (3 szám random generálása) 
-	Nehézségi szint állítás: Könnyű fokozaton 3 színes négyzet, nehézen 6 darab.
-	Random színek (3/6 szín) generálása és beállítása a négyzetek színeinek. Egy színnek meg kell egyeznie az generált RGB kóddal.
-	Tippelésnél rossz tipp esetén eltűnik a négyzet.
-	Tippelésnél jó tipp esetén az összes négyzet azonos színű lesz a helyes színnel.
-	Tippelési lehetőségek száma 3. 3 rossz tipp után vége a játéknak.
-	Ha kevesebb mint 3 tippből megtalálják a színt, akkor 1 pontot kap a játékos.
-	Új RGB kód lesz generálva és a megmaradt tippelési lehetőségekkel tovább tippelhet a játékos. 
-	Addig kapja a pontokat, ameddig helyesen tippel és van még tippelési lehetősége.
-	A játéknak ki kell írnia a megmaradt tippek számát és az aktuális pontszámot. 
-	Kell egy új szín kérő gomb
-	Kell egy „újra próbálom” gomb.
-	Nehézségi szint váltó gombok/ kapcsoló


-	Folytatás gomb: 

o	rejtve van az elején. Csak akkor jelenik meg, ha helyesen tippelt a játékos.
o	Rákattintva új RGB kódot generál + új színek a négyzeteknek. A tippeket és pontokat számolja tovább.
o	Kattintás után eltűnik. A következő helyes tippnél jelenik meg újra, ha még nem fogytak el a tippek.

-	Újra próbálom gomb:

o	Az elején a felirat „Keverd újra”. Ilyenkor megnyomva nem állítódik vissza a tippek és a pontok száma. Csak újra keveri a színeket. 
o	Helyes tippnél legyen letiltva. (Amikor a folytatás gomb aktív.)
o	Ha elfogytak a tippek, akkor változzon a felirat „Újra próbálom”-ra. Ilyenkor kattintva a pontok és a tippek visszaállítódnak, színeket újra keveri. 

-	Tippelésnél:

o	Rossz tippnél Tippek -1, jó tippnél Pontok +1.
o	Helyes tipp esetén folytatás gomb megjelenik, keverd újra gomb eltűnik. 
o	Folytatásra kattintva a folytatás gomb eltűnik, a keverd újra megjelenik újra.

-	Nehézség állító gombok:

o	Játék közben nehézségi szint váltásnál a tippek száma és a pontok is visszaállnak alaphelyzetbe + színek is újra lesznek keverve.

-	Effekt:

o	3/6 négyzet van a képernyőn egymástól bizonyos távolságra. Négyzetek sarkai lekerekítettek.
o	Helyes tipp esetén az összes négyzet színe a helyes színre változik.
o	Helyes tipp esetén tűnjön el a távolság a négyzetek között és a lekerekítések.  Egy nagy egyszínű négyzetet kapunk.
o	Folytatásra kattintva új színek generálásával együtt álljon vissza a a távolság a négyzetek között + a lekerekítés. 

# Game Shelf

Game shelf is a simple **randomisation tool**, that helps you choose which of your (many) board games you should play on a given day.

----

Game shelf allows you to **filter your board games' database** based on the number of players, desired game time, language, type (cooperative or competitive) and complexity. It then **randomly chooses** one of the games that meet the selected criteria.

To help you choose the right game, the game shelf requires you to read in a **.csv file** containing your board games' database. The database **needs to contain the following collums** *(see the boardGames.csv file for an example)*:

* GAME *(game name)*
* MIN_PLAYERS *(minimum number of players required)*
* MAX_PLAYERS *(maximum number of players allowed)*
* MIN_TIME *(minimum time required)*
* MAX_TIME *(maximum time required)*
* COMPLEXITY *(game complexity on a scale of 1-5)*
* LANGUAGE *(language of the game, use NA if no specific language required)*
* TYPE *(game type, cooperative or competitive)*
* TEAM *(team vs solo game, use 'yes' for team and 'no' for solo games)*



Currently, this tool works only with the .csv files, containing all the required collumns and information. Similarly, it only provides artwork for the games included in the example *boardGames.csv* database. The only game languages supported at the moment are ENG (English), PL (Polish) and NA (no specific language required). 

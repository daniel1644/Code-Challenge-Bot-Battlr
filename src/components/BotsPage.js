import React, { useEffect, useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";
import SortBar from "./SortBar";

function BotsPage() {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [botArmy, setBotArmy] = useState([]);
  const [filteredBots, setFilteredBots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8002/bots")
      .then(response => response.json())
      .then(data => {
        setBots(data);
        setFilteredBots(data);
      })
      .catch(error => console.error("Error fetching bots:", error));
  }, []);

  const handleSelectBot = (bot) => {
    setSelectedBot(bot);
  };

  const handleEnlist = (bot) => {
    if (!botArmy.some(b => b.id === bot.id)) {
      setBotArmy([...botArmy, bot]);
      setFilteredBots(filteredBots.filter(b => b.id !== bot.id));
    }
    setSelectedBot(null);
  };

  const handleReleaseBot = (botToRelease) => {
    setBotArmy(botArmy.filter(bot => bot.id !== botToRelease.id));
  };

  const handleDeleteBot = (botToDelete) => {
    fetch(`http://localhost:8002/bots/${botToDelete.id}`, {
      method: "DELETE"
    })
      .then(() => {
        setBotArmy(botArmy.filter(bot => bot.id !== botToDelete.id));
        setBots(bots.filter(bot => bot.id !== botToDelete.id));
        setFilteredBots(filteredBots.filter(bot => bot.id !== botToDelete.id));
      })
      .catch(error => console.error("Error deleting bot:", error));
  };

  const sortBots = (property) => {
    const sortedBots = [...filteredBots].sort((a, b) => a[property] - b[property]);
    setFilteredBots(sortedBots);
  };

  const filterBotsByClass = (botClass) => {
    const filteredByClass = bots.filter(bot => bot.bot_class === botClass);
    setFilteredBots(filteredByClass);
  };

  return (
    <div>
      {selectedBot ? (
        <BotSpecs bot={selectedBot} onGoBack={() => setSelectedBot(null)} onEnlist={handleEnlist} />
      ) : (
        <>
          <YourBotArmy bots={botArmy} onReleaseBot={handleReleaseBot} onDeleteBot={handleDeleteBot} />
          <SortBar onSort={sortBots} />
          <BotCollection bots={filteredBots} onSelectBot={handleSelectBot} />
        </>
      )}
    </div>
  );
}

export default BotsPage;

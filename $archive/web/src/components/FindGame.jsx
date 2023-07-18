import GameCard from "./GameCard";

export function FindGame({ games }) {
	if(Array.isArray(games)) {
		return (
			<div className="">
				{
					games.map(game => <GameCard detail={ game } key={ game.id } />)
				}
			</div>
		);
	}

	return null;
};

export default FindGame;
import { useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { mockMatches } from "@/data/mockData"
import { toast } from "@/components/ui/sonner";

interface Player {
    id: string
    name: string
    nickname: string
    avatar: string
    hasPaid: boolean
    isConfirmed: boolean
}

interface Team {
    id: string
    name: string
    players: string[]
}




export function ManageMatchModel() {
    const { matchId } = useParams()

    const Navigate = useNavigate()

    // Mock match data - in real app would fetch by matchId
    const match = mockMatches.organizing[0]

    const [players, setPlayers] = useState<Player[]>([
        { id: "1", name: "João Silva", nickname: "joaoplayer", avatar: "https://i.pravatar.cc/150?img=3", hasPaid: true, isConfirmed: true },
        { id: "2", name: "Lucas Santos", nickname: "lucas10", avatar: "https://i.pravatar.cc/150?img=4", hasPaid: true, isConfirmed: true },
        { id: "3", name: "Pedro Lima", nickname: "pedrinho", avatar: "https://i.pravatar.cc/150?img=6", hasPaid: false, isConfirmed: true },
        { id: "4", name: "Carlos Mendes", nickname: "carlitos", avatar: "https://i.pravatar.cc/150?img=7", hasPaid: true, isConfirmed: true },
        { id: "5", name: "Rafael Costa", nickname: "rafa99", avatar: "https://i.pravatar.cc/150?img=8", hasPaid: false, isConfirmed: false },
    ])

    const [teams, setTeams] = useState<Team[]>([
        { id: "team1", name: "Team A", players: [] },
        { id: "team2", name: "Team B", players: [] }
    ])

    const [newPlayerName, setNewPlayerName] = useState("")
    const [isShuffling, setIsShuffling] = useState(false)

    const addPlayer = () => {
        if (!newPlayerName.trim()) return

        const newPlayer: Player = {
            id: Date.now().toString(),
            name: newPlayerName.trim(),
            nickname: newPlayerName.toLowerCase().replace(" ", ""),
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
            hasPaid: false,
            isConfirmed: false
        }

        setPlayers(prev => [...prev, newPlayer])
        setNewPlayerName("")

        toast.success("Jogador Adicionado", {
            description: `${newPlayer.name} foi adicionado à partida.`
        })
    }

    const removePlayer = (playerId: string) => {
        setPlayers(prev => prev.filter(p => p.id !== playerId))
        setTeams(prev => prev.map(team => ({
            ...team,
            players: team.players.filter(p => p !== playerId)
        })))

        toast.success("Jogador Removido", {
            description: "Jogador foi removido da partida."
        })
    }

    const togglePayment = (playerId: string) => {
        setPlayers(prev => prev.map(p =>
            p.id === playerId ? { ...p, hasPaid: !p.hasPaid } : p
        ))
    }

    const toggleConfirmation = (playerId: string) => {
        setPlayers(prev => prev.map(p =>
            p.id === playerId ? { ...p, isConfirmed: !p.isConfirmed } : p
        ))
    }

    const shuffleTeams = async () => {
        setIsShuffling(true)

        const confirmedPlayers = players.filter(p => p.isConfirmed)
        const shuffled = [...confirmedPlayers].sort(() => Math.random() - 0.5)
        const mid = Math.ceil(shuffled.length / 2)

        // Simulate delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000))

        setTeams([
            { id: "team1", name: "Time A", players: shuffled.slice(0, mid).map(p => p.id) },
            { id: "team2", name: "Time B", players: shuffled.slice(mid).map(p => p.id) }
        ])

        setIsShuffling(false)


    }

    const onStartMatch = () => {
        Navigate(`/match/${matchId}/live`)
    }

    const confirmedPlayers = players.filter(p => p.isConfirmed)
    const paidPlayers = players.filter(p => p.hasPaid)

    return {
        match,
        players,
        teams,
        newPlayerName,
        isShuffling,
        confirmedPlayers,
        paidPlayers,
        matchId,
        setNewPlayerName,
        addPlayer,
        removePlayer,
        togglePayment,
        toggleConfirmation,
        shuffleTeams,
        onStartMatch

        
    }

}
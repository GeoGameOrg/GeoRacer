import { Lobby } from "./lobby"

type SocketResponse = {
	success: boolean;
	data: any
	error: string | null;
}


class SomeSocketResponse<DataType> implements SocketResponse {
	success: boolean
	data: (DataType | null)
	error: string | null

	constructor(success: boolean, data: DataType | null, error: string | null) {
		this.success = success
		this.data = data
		this.error = error
	}
}

/** 
 * IdSocketResponse
 * Response Type for "id"
 */
class IdSocketResponse extends SomeSocketResponse<string> {
	static failure(reason: string): IdSocketResponse {
		return new IdSocketResponse(false, null, reason)
	}

	static success(data: string): IdSocketResponse {
		return new IdSocketResponse(true, data, null)
	}
}

/** 
 * CreateRoomSocketResponse
 * Response Type for "createRoom"
 */
class CreateRoomSocketResponse extends SomeSocketResponse<Lobby> {
	static failure(reason: string): CreateRoomSocketResponse {
		return new CreateRoomSocketResponse(false, null, reason)
	}

	static success(lobby: Lobby): CreateRoomSocketResponse {
		return new CreateRoomSocketResponse(true, lobby, null)
	}
}

/** 
 * JoinRoomSocketResponse
 * Response Type for "joinRoom"
 */
class JoinRoomSocketResponse extends CreateRoomSocketResponse { }


export { IdSocketResponse, CreateRoomSocketResponse, JoinRoomSocketResponse }
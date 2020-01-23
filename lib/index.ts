import { RequestHandler } from 'express'
import { CorsOptions, Headers, setup } from 'libcors'


export function libcors( opts?: Partial< CorsOptions > ): RequestHandler
{
	const fn = setup( opts );

	return function( req, res, next )
	{
		fn( req.method, req.headers as Headers )
		.then( result =>
		{
			Object.keys( result.headers ).forEach( key =>
				res.setHeader( key, result.headers[ key ] )
			);

			if ( res.vary && result.vary.length )
				result.vary.forEach( value => res.vary( value ) );

			if ( result.status )
			{
				res.writeHead( result.status );
				res.end( );
			}
			else
				next( );
		} )
		.catch( err => next( err ) );
	};
}

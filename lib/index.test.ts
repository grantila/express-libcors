import * as express from "express"
import * as supertest from "supertest"

import { libcors } from "./index"

const ignoreHeaders =
	[ "x-powered-by", "date", "connection", "content-length" ];
const stripIgnoredHeaders = < T extends { } >( obj: T ) =>
	Object.keys( obj )
	.reduce(
		( prev, cur ) =>
			ignoreHeaders.includes( cur )
			? prev
			: Object.assign( prev, { [ cur ]: obj[ cur as keyof T ] } )
		,
		{ } as T
	);

describe( "express-libcors", ( ) =>
{
	it( "should allow default configuration w/o CORS headers", async ( ) =>
	{
		const app = express( );

		app.use( libcors( ) );
		app.get( "/", ( req, res ) => { res.end( "foobar" ); } );

		const response = await supertest( app )
			.get( "/" )
			.expect( "foobar" );

		const strippedHeaders = stripIgnoredHeaders(response.header);
		expect( strippedHeaders ).toEqual( { } );
	} );

	it( "should allow default configuration w/ CORS headers", async ( ) =>
	{
		const app = express( );

		app.use( libcors( ) );
		app.get( "/", ( req, res ) => { res.end( "foobar" ); } );

		const response = await supertest( app )
			.get( "/" )
			.set( "origin", "http://example1.com" )
			.expect( "foobar" );

		const strippedHeaders = stripIgnoredHeaders(response.header);
		expect( strippedHeaders ).toEqual( {
			"access-control-allow-origin": "*",
		} );
	} );

	it( "should allow accepted origin w/ CORS headers", async ( ) =>
	{
		const app = express( );

		app.use( libcors( { origins: [ "http://example1.com" ] } ) );
		app.get( "/", ( req, res ) => { res.end( "foobar" ); } );

		const response = await supertest( app )
			.get( "/" )
			.set( "origin", "http://example1.com" )
			.expect( "foobar" );

		const strippedHeaders = stripIgnoredHeaders(response.header);
		expect( strippedHeaders ).toEqual( {
			"access-control-allow-origin": "http://example1.com",
			vary: "Origin",
		} );
	} );

	it( "should not allow other origin w/ CORS headers", async ( ) =>
	{
		const app = express( );

		app.use( libcors( { origins: [ "http://example1.com" ] } ) );
		app.get( "/", ( req, res ) => { res.end( "foobar" ); } );

		const response = await supertest( app )
			.get( "/" )
			.set( "origin", "http://example2.com" )
			.expect( "foobar" );

		const strippedHeaders = stripIgnoredHeaders(response.header);
		expect( strippedHeaders ).toEqual( { } );
	} );

	it( "should end preflight OPTIONS w/ CORS headers", async ( ) =>
	{
		const app = express( );

		app.use( libcors( {
			endPreflightRequests: true,
			origins: [ "http://example1.com" ],
		} ) );
		app.options( "/", ( req, res ) => { res.end( "foobar" ); } );

		const response = await supertest( app )
			.options( "/" )
			.set( "origin", "http://example1.com" )
			.expect( 204 );

		const strippedHeaders = stripIgnoredHeaders(response.header);
		expect( strippedHeaders ).toEqual( { "vary": "Origin" } );
	} );

	it( "should fail on throwing callbacks", async ( ) =>
	{
		const app = express( );
		const err = new Error( "foo" );

		app.use( libcors( { origins: ( ) => { throw err; } } ) );
		app.get( "/", ( req, res ) => { res.end( "foobar" ); } );

		await supertest( app )
			.get( "/" )
			.set( "origin", "http://example1.com" )
			.expect( 500 );
	} );
} );

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.logica;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author ccamilo.mendoza
 */
@ServerEndpoint(value = "/tablero", encoders = {FigureEncoder.class}, decoders={FigureDecoder.class})
public class TableroCompartido {

    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    
    @OnMessage
    public void broadcastFigure(Figure figura, Session session) throws IOException, EncodeException {
        for(Session peer: peers ){
            if(!peer.equals(session)){
                peer.getBasicRemote().sendObject(figura);
            }
        }
    }

    @OnOpen
    public void onOpen(Session p) {
        peers.add(p); 
    }
    

    @OnClose
    public void onClose(Session p) {
        peers.remove(p);
    }
    
}

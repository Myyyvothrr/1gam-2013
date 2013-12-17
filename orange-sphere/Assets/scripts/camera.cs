using UnityEngine;
using System.Collections;

public class camera : MonoBehaviour
{
    public Transform target;

    private Vector3 pos = new Vector3(0, 0, 0);
    
	void LateUpdate ()
    {
        if (target)
        {
            pos.x = target.position.x;
            pos.y = target.position.y + 1;
            pos.z = -5;

            transform.position = pos;

            transform.LookAt(target);
        }
	}
}
